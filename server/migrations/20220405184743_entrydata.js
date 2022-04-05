
exports.up = function (knex) {
    return knex.schema.createTable('entrydata', table => {
        table.integer('entry_id').unsigned().references('id').inTable('entry').onDelete('CASCADE').onUpdate('CASCADE')
        table.integer('field_id').unsigned().references('id').inTable('field').onDelete('CASCADE').onUpdate('CASCADE')
        table.text('data')
        table.timestamps(true, true)
        table.primary(['entry_id', 'field_id']);
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('entrydata')
}
