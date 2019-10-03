
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password', 60).notNull()
        table.boolean('is_active').notNull().defaultTo(true)
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
