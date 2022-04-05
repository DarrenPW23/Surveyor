const { returner } = require('../util/util')
const { isUndefined, isNull } = require('lodash')
const Form = require('../models/Form')

const create = async (args = {}) => {
    if (isNull(args.name || null)) return returner({ message: 'Cannot create form.', errors: { name: 'A name is required for your form.' } }, 400)

    let form = {
        name: args.name,
        description: args.description || null
    }

    try {
        let insert = await new Form(form).save()
        insert = insert.toJSON()
        let success = !isUndefined(insert.id)

        return returner({
            success,
            message: success ? `Form created successfully` : `Failed to create new Form.`,
            data: insert
        });
    } catch (errors) {
        console.log(errors)
        return returner({
            message: `Failed to create new Form.`,
            errors
        }, 400)
    }
}

const retrieve = async (args = null) => {
    if (isNull(args)) args = '1=1'

    try {
        let fetched = await new Form().where(args).fetchAll();

        return returner({
            success: true,
            message: `Form fetch success.`,
            data: fetched.toJSON()
        });
    } catch (errors) {
        return returner({
            message: `Failed to retrieve Form.`,
            errors
        }, 400)
    }
}

const update = async (id = null, args = {}) => {
    if (isNull(args.name || null)) return returner({ message: 'Cannot update form.', errors: { name: 'A name is required for your form.' } }, 400)
    if (isNull(id)) return returner({ message: 'Cannot update form. [id] needs to be defined in your request.' }, 400)

    let form = {
        name: args.name || null,
        description: args.description || null
    }

    try {
        let patched = await new Form({ id }).save(form, { patch: true });

        return returner({
            success: true,
            message: `Form update success.`,
            data: patched
        });
    } catch (errors) {
        return returner({
            message: `Error trying to update your Form.`,
            errors
        }, 400)
    }
}

const destroy = async (id = null) => {
    if (isNull(id)) return returner({ message: 'Cannot delete form. [id] needs to be defined in your request.' }, 400)

    try {
        let destroyed = await new Form({ id }).destroy()

        return returner({
            success: true,
            message: `Form delete success.`,
            data: destroyed
        });
    } catch (errors) {
        return returner({
            message: `Error trying to delete your Form.`,
            errors
        }, 400)
    }
}

module.exports = {
    create,
    retrieve,
    update,
    destroy
}