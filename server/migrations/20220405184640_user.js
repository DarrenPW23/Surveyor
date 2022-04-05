
exports.up = function (knex) {
    return knex.schema.createTable('user', table => {
        table.increments()
        table.string('username')
        table.string('password')
        table.string('email')
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user')
}
