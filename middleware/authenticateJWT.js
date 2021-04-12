const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const authenticateJWT = async (req, res, next) => {
    try {

        // console.log(req.headers.authorization)

        const authHeader = req.headers.authorization
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', authHeader);
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', process.env.JWT_SECRET);
        const decode = jwt.verify(authHeader, process.env.JWT_SECRET)
        const foundUser = await User.findById(decode._id)
        
        
        // console.log(authHeader, decode, foundUser)

        res.locals.user = foundUser
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa', foundUser);
        next()

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: "authentication failed" })
    }
}


module.exports = authenticateJWT