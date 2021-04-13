const jwt = require('jsonwebtoken');
const config = require('config');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'NoAuthorization' });
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        return next();
    } catch (e) {
        res.status(401).json({ message: 'NoAuthorization' });
    }
};
