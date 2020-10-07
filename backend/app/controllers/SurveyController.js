const SurveysModel = require('../models/SurveysModel')
const FieldsModel = require('../models/FieldsModel')
const EntriesModel = require('../models/EntriesModel')
const EntryDataModel = require('../models/EntryDataModel')

get = (args = {}, callback) => {
    SurveysModel.get(args).then(surveys => {
        surveys.forEach((survey, i) => {
            var survey_ID = survey.ID
            var args = {}

            args[FieldsModel.fk.field] = survey_ID

            FieldsModel.get(args).then(b => {
                var fields = b

                Object.assign(survey, { fields: fields })

                args = {}
                args[EntriesModel.fk.field] = survey_ID

                EntriesModel.get(args).then(c => {
                    var entries = c

                    entries.forEach(e => {
                        delete e[EntriesModel.fk.field]

                        fields.forEach(field => {
                            if (!e.hasOwnProperty(field.slug))
                                e[field.slug] = ''
                        })
                    })

                    var entryids = entries.map(e => { return e.ID })
                    var fieldids = fields.map(e => { return e.ID })

                    args = {
                        entry_id: entryids.length > 0 ? entryids : '',
                        field_id: fieldids.length > 0 ? fieldids : ''
                    }

                    EntryDataModel.get(args).then(d => {
                        entries.forEach(e => {
                            let entry_data = d.filter(data => {
                                return data.entry_id == e.ID
                            })

                            entry_data.forEach(data => {
                                let rel_field = fields.find(field => field.ID == data.field_id)
                                if (rel_field)
                                    e[rel_field.slug] = data.data
                            })
                        })

                        Object.assign(survey, { entries: entries })

                        if (i == surveys.length - 1) callback(surveys)
                    })
                })
            })

            surveys[i] = survey
        })
    })
}

module.exports = {
    get
}