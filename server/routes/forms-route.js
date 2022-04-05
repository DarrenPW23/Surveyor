const router = require('express').Router();

const FormController = require('../controllers/FormController');

router.get('/:id?', async (req, res) => {
    let id = req.params.id || null;
    let form = await FormController.retrieve(id);
    let status = form.status

    delete form.status;

    return res.status(status).send(form);
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

module.exports = router;