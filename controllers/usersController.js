const router = require('express').Router()
const authenticateJWT = require('../middleware/authenticateJWT')
const User = require('../models/User.js')

router.get('/', authenticateJWT, async (req, res) => {
    try {
        const loggedInUser = await User.findById(res.locals.user.id)
        
        res.json({ userInfo: loggedInUser})
    
    } catch(err) {
        console.log(err);
    }
}) 

router.post('/score/', authenticateJWT, async (req, res) => {
    try {
        const loggedInUser = await User.findById(res.locals.user.id) // // what is current user

        
        if (req.body.current_score > loggedInUser.best_score) {
            const updateBestScore = await User.findOneAndUpdate(
                { provider_id: loggedInUser.provider_id },
                { best_score: req.body.current_score }
            )
        }

        const findUser = await User.find({ provider_id: loggedInUser.provider_id })
        console.log(findUser);
        res.json({ findUser: findUser})
    } catch(err) {
        console.log(err);
    }
})

module.exports = router