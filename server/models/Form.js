const bookshelf = require('../util/DB')

const Entry = require('./Entry')
const Field = require('./Field')

const Form = bookshelf.model('Form', {
    tableName: 'form',
    hidden: ['created_at', 'updated_at'],
    fields: function() {
        return this.hasMany('Field')
    },
    entries: function() {
        return this.hasMany('Entry')
    }
})

module.exports = Form;