const passport = require('passport')
const Strategy = require('passport-facebook').Strategy
const User = require('../models/User')

passport.use(new Strategy({
    clientID: process.env['FACEBOOK_CLIENT_ID'],
    clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    callbackURL: `/auth/facebook/callback`
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.findOne({
        provider: profile.provider,
        provider_id: profile.id
    })
    console.log('The user from our database', user)
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    
  }
))

module.exports = passport