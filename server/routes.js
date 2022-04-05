const router = require('express').Router();
const FormsRoute = require('./routes/forms-route')

router.use('/form', FormsRoute)

module.exports = router;