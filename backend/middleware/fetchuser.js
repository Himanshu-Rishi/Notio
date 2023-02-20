var jwt = require('jsonwebtoken');
const JWTsignature = process.env.JWTsignature;

const fetchuser = (req, res, next) => {
    const given_token = req.header('auth-token')
    if (!given_token) {
        return res.status(401).send({ error: "Please authenticate using a valid token." })
    }
    try {
        const data = jwt.verify(given_token, JWTsignature)
        req.user = data.user
        next()
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token." })
    }
}

module.exports = fetchuser