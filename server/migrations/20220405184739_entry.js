
exports.up = function (knex) {
    return knex.schema.createTable('entry', table => {
        table.increments()
        table.integer('form_id').unsigned().references('id').inTable('form').onDelete('CASCADE').onUpdate('CASCADE')
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('entry')
}
