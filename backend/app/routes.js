const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const SurveyController = require('./controllers/SurveyController')

const getDirectories = source => fs.readdirSync(source).map(name => path.join(source, name)).filter(source => fs.lstatSync(source).isDirectory())

getDirectories(__dirname + '/components').forEach(e => {
    var routes = e + '/routes.js'
    var config = e + '/config.js'

    if (fs.existsSync(config))
        config = require(config)

    // these routes can overwrite the existing ones below
    if (fs.existsSync(routes))
        router.use(config.root || '/', require(routes))
})

router.get('/', (req, res) => {
    SurveyController.get({}, data => res.send(data))

    // code to insert
    /* var fields = [
        {
            label: 'First Field',
            description: 'Enter your first text here'
        },
        {
            label: 'Second Field',
            description: 'Enter your second text here'
        }
    ]
    SurveyController.create({ name: 'Another Survey', start: '2020-10-08', end: '2020-12-31', fields: fields }, data => res.send(data)) */
})

module.exports = router