const express = require('express');
const router = express.Router({ mergeParams: true });
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator/check');

var UsersModel = require('../../models/UsersModel')


router.get('/login', (req, res) => {
    res.send(`Login page`);
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', [
    check('email')
        .isLength({ min: 1 })
        .withMessage('Email is required')
        .normalizeEmail(),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Passwords must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('Passwords must contain one number'),
    check('repeat_password', 'Passwords do not match')
        .exists()
        .custom((value, { req }) => value === req.body.password)
], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // res.send(errors);
        res.render('register', { errors: errors.mapped(), formData: req.body });
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            var values = [req.body.email, req.body.username, hash]

            UsersModel.insert(['email', 'username', 'password'], values).then(result => {
                res.send(result);
                // if(typeof result == "string") {
                //     res.render('system/register', {flash: result});
                // } else if(result) {
                //     res.render('system/register', {flash: "Successfully created a new account"});
                // } else {
                //     res.render('system/register', {flash: "Failed to create new account"});
                // }
            })
        });
    }
});

module.exports = router;