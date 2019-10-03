
exports.up = function(knex) {
    return knex.schema.createTable('profiles', table => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
        table.string('label').notNull()
    }).then(() => {
        return knex('profiles').insert([
            { name: 'common', label: 'Comum' },
            { name: 'admin', label: 'Administrador' },
            { name: 'master', label: 'Master' }
        ])
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('profiles')
};
