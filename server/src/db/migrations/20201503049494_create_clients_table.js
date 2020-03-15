//I only want migrations, rollbacks, and seeds to run when the NODE_ENV is specified
//in the knex seed/migrate command. Knex will error out if it is not specified.
if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV not set')
}

exports.up = function(knex, Promise) {
    return knex.schema.createTable('clients', function(table) {
        table.charset('utf8mb4')
        table.collate('utf8mb4_unicode_ci')

        table.increments('id').primary()
        table.string('fullName').notNullable()
        table
            .string('email', 191)
            .notNullable()
            .unique()
        table.string('phone').notNullable()
        table
            .enu('status', ['NEW', 'IN_PROGRESS', 'DONE'])
            .notNullable()
        table
            .dateTime('updatedAt')
            .defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table
            .dateTime('createdAt')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    })
}

exports.down = function(knex, Promise) {
    //We never want to drop tables in production
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists('clients')
    }
}
