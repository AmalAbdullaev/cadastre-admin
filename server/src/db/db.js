var environment = process.env.NODE_ENV || 'development'
var config = require('../../knexfile.js')[environment]

const knex = require('knex')(config)
const bookshelf = require('bookshelf')(knex)

const Client = bookshelf.model('Client', {
    tableName: 'clients'
})

module.exports = knex

