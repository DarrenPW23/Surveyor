const bookshelf = require('../util/DB')

const Form = require('./Form')

const Field = bookshelf.model('Field', {
    tableName: 'field',
    form() {
        return this.belongsTo('Form')
    },
})

module.exports = Field;