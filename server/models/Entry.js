const bookshelf = require('../util/DB')

const Form = require('./Form')
const EntryData = require('./EntryData')

const Entry = bookshelf.model('Entry', {
    tableName: 'entry',
    form() {
        return this.belongsTo('Form')
    },
    entry_data() {
        return this.hasMany('EntryData')
    }
})

module.exports = Entry;