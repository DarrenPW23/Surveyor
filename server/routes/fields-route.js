const { isUndefined, isNull } = require('lodash');
const { returner } = require('../util/util');

const router = require('express').Router();

router.use('/', (req, res, next) => {
    if (isUndefined(req.form) || isUndefined(req.form.id) || isNull(req.form.id)) return res.status(404).send(returner({ message: `Form not specified. Cannot find fields.` }))
    return next()
})

router.get('/:id?', async (req, res) => { })

router.post('/', async (req, res) => { })

router.put('/:id', async (req, res) => { })

router.delete('/:id', async (req, res) => { })

module.exports = router;