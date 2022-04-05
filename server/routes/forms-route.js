const router = require('express').Router();

const FieldsRoute = require('./fields-route')
const FormController = require('../controllers/FormController');

router.get('/:id?', async (req, res) => {
    let id = req.params.id || null;
    let form = await FormController.retrieve(id);

    return res.status(form.status).send(form);
})

router.post('/', async (req, res) => {
    let form = await FormController.create(req.body);

    return res.status(form.status).send(form);
})

router.put('/:id', async (req, res) => {
    let updated = await FormController.update(req.params.id, req.body)
    return res.send(updated)
})

router.delete('/:id', async (req, res) => {
    let destroyed = await FormController.destroy(req.params.id)
    return res.send(destroyed)
})

router.use('/:id/fields/', (req, res, next) => {
    req.form.id = req.params.id
    return next()
}, FieldsRoute)

module.exports = router;