const passport = require('passport');
const InstaStrategy = require('passport-instagram');
const keys = require('./keys')

passport.use(
    new InstaStrategy({
        // Options for Instagram strategy
        callbackURL: '/auth/instagram/redirect',
        clientID: keys.instagram.clientID,
        clientSecret: keys.instagram.clientSecret

    }, (accessToken, refreshToken, profile, done) =>{
        // Passport callback function
        console.log('Passport callback function fired')
        // console.log(profile)
    })
)
