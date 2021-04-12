// From the passport.js documentation for express-4.x-facebook-example
// https://github.com/passport/express-4.x-facebook-example/blob/master/server.js
// Modified for use w/ Github

const passport = require('passport')
const Strategy = require('passport-github2').Strategy
const User = require('../models/User')

passport.use(new Strategy({
    clientID: process.env['GITHUB_CLIENT_ID'],
    clientSecret: process.env['GITHUB_CLIENT_SECRET'],
    callbackURL: `/auth/github/callback`
},
    async function (accessToken, refreshToken, profile, cb) {
        // profile is the Github User object we get from Github
        const user = await User.findOne({
            provider: profile.provider,
            provider_id: profile.id
        })
        // console.log('The user from our database', user)

        if(!user) {
            const newUser = await User.create({
                provider: profile.provider,
                provider_id: profile.id,
                displayName: profile.username,
                name: {
                    givenName: profile.displayName,
                },
                photos: profile.photos
            })
            // console.log('New user saved in database', newUser)
            
            // We just created a user, return that user
            return cb(null, newUser)
        } else {
            // The user is already in the db
            return cb(null, user);
        }
    }
));

module.exports = passport