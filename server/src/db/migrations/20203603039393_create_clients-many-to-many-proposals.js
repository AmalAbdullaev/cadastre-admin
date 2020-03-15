//I only want migrations, rollbacks, and seeds to run when the NODE_ENV is specified
//in the knex seed/migrate command. Knex will error out if it is not specified.
if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV not set')
}

exports.up = function(knex, Promise) {
    return knex.schema.createTable('clients_proposals', function(table) {
        table.charset('utf8mb4')
        table.collate('utf8mb4_unicode_ci')

        table.integer('proposal_id').unsigned().references('proposals.id')
        table.integer('client_id').unsigned().references('clients.id')
    })
}

exports.down = function(knex, Promise) {
    //We never want to drop tables in production
    if (process.env.NODE_ENV !== 'production') {
        return knex.schema.dropTableIfExists('clients_proposals')
        .dropTable('proposals')
        .dropTable('clients')
    }
}
