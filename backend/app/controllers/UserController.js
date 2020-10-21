const UsersModel = require('../models/UsersModel')
const slugify = require('slugify')

get = (args = {}, callback) => {
    UsersModel.get(args).then(results => callback(result))
}

module.exports = {
    get
}