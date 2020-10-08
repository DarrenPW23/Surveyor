const SurveysModel = require('../models/SurveysModel')
const FieldsModel = require('../models/FieldsModel')
const EntriesModel = require('../models/EntriesModel')
const EntryDataModel = require('../models/EntryDataModel')
const slugify = require('slugify')

SQLifyDate = (dateObj) => {
    return dateObj.toISOString().slice(0, 19).replace('T', ' ')
}

create = (args = {}, callback) => {
    var return_data = {
        success: false,
        message: 'Survey creation failed',
        data: [],
        errors: []
    }

    var name = args.name || ''
    var slug = name !== '' ? slugify(name, '-').toLowerCase() : ''
    var start = SQLifyDate(args.start ? new Date(Date.parse(args.start)) : new Date())
    var end = SQLifyDate(args.end ? new Date(Date.parse(args.end)) : new Date())

    var fields = args.fields || []
    fields.forEach((field, i) => {
        field.label = field.label || ''
        field.slug = slugify(field.slug ? field.slug : (field.label || '')).toLowerCase()
        field.description = field.description || ''
    })

    if (fields.length && fields.filter(field => typeof field.label === 'undefined' || field.label == '' ).length > 0) {
        return_data.errors.push('Could not add fields to survey. Field labels are required')
        return callback(return_data)
    }

    SurveysModel.get({ slug }).then(results => {
        var values = []
        values.push([name, slug, start, end])

        SurveysModel.insert(['name', 'slug', 'start_date', 'end_date'], values).then(result => {
            var surveyID = result.insertId

            values = []
            fields.forEach((field, i) => {
                values.push([field.label, field.slug, field.description, surveyID])
            })
            
            FieldsModel.insert(['label', 'slug', 'description', 'survey_id'], values).then(result => callback(result))
        })
    })
}

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
    get,
    create
}