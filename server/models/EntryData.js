const bookshelf = require('../util/DB')

const Entry = require('./Entry')

const EntryData = bookshelf.model('EntryData', {
    tableName: 'entrydata',
    entry() {
        return this.belongsTo('Entry')
    }
})

module.exports = EntryData;