const router = require('express').Router()
const authenticateJWT = require('../middleware/authenticateJWT')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const Score = require('../models/Score.js')

// user -> {(id1 - auto generated): {name: jae, email: jaeyipp@}, user2: {}...}
// score -> {(id - auto generated): {score:100, userId: id1}, user2: 80 ...}
// res.locals.user.id -> id1

router.post('/score', authenticateJWT, async (req, res) => {
    try {
       
        // what is current user?
        const foundUser = await User.findById(res.locals.user.id)
        const foundUserInScore = await Score.find({uesrId: foundUser._id})
        // comparing with existing score

        // if in-coming score is higher than the score in db -> new Score
        
        // else return
        

        const bestScore = await new Score({
            score: req.body.current_score,
            userId: foundUser._id
        })
        bestScore.save()

        // console.log(bestScore);
    } catch(err) {
        console.log(err);
    }
})



// module.exports = router

module.exports = router
