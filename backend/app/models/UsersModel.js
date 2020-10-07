var table = 'users'
var fk = { field: 'role', belongsTo: 'roles' }

module.exports = {
    table,
    fk
}