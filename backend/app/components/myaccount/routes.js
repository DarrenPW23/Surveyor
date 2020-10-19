const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/login', (req, res) => {
    res.send(`Login page`);
});

router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;