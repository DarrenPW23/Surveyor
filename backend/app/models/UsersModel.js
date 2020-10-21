var table = 'users'
var fk = { field: 'role', belongsTo: 'roles' }

module.exports = new BaseTable('users', 'ID', { field: 'role', belongsTo: 'roles' })