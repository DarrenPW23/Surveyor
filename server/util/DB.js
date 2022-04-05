const knexfile = require('../knexfile');

// Setting up the database connection
const knex = require('knex')(knexfile.development)

const Bookshelf = require('bookshelf')(knex)

module.exports = Bookshelf;