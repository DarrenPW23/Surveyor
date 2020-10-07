var BaseTable = require('./BaseTable')

module.exports = new BaseTable('fields', 'ID', { field: 'survey_id', belongsTo: 'surveys' })