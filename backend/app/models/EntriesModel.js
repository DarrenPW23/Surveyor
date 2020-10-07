var BaseTable = require('./BaseTable')

module.exports = new BaseTable('entries', 'ID', { field: 'survey_id', belongsTo: 'surveys' })