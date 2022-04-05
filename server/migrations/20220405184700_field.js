
exports.up = function (knex) {
    return knex.schema.createTable('field', table => {
        table.increments()
        table.integer('form_id').unsigned().references('id').inTable('form').onDelete('CASCADE').onUpdate('CASCADE')
        table.string('name')
        table.string('label')
        table.string('description')
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('field')
}
