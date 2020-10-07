var BaseTable = require('./BaseTable')

module.exports = new BaseTable('entry_data', 'ID', { field: 'field_id', belongsTo: 'fields' })