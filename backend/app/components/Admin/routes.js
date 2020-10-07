const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/:id?', (req, res) => {
    res.send(`Hello there admin ${req.params.id || ''}`);
});

module.exports = router;