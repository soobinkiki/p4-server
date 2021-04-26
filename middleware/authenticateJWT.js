const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const authenticateJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const decode = jwt.verify(authHeader, process.env.JWT_SECRET)
        const foundUser = await User.findById(decode._id)

        res.locals.user = foundUser
        next()

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: "authentication failed" })
    }
}


module.exports = authenticateJWT