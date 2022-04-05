const { isNull, isUndefined } = require('lodash');
const { returner } = require('./util');

let verifyAuth = async (req, res, next) => {
    const jwt = require('./jwt');
    const authheader = req.headers['authorization'];

    var token = authheader && authheader.split(' ')[1];

    if (isNull(token) || isUndefined(token)) return res.status(401).send(returner({ message: 'Access forbidden.' }));

    token = token.replace('"', '');

    try {
        let payload = jwt.verify(token);

        req.user = payload;

        return next();
    } catch (error) {
        return res.status(401).send(returner({ message: 'Cannot authenticate user. Malformed Auth token.' }));
    }
}

module.exports = {
    verifyAuth
}