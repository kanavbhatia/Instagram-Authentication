const passport = require('passport');
const InstagramStrategy = require('passport-instagram');
const keys = require('./keys');
// let userAccessToken = '';
const User = require('../models/user-models');

//Serialise --> takes info(user) from records and paste it(user's id) to the cookie
passport.serializeUser((user,done)=>{
    done(null,user.id)
    // 1st parameter represents over here represents error which is null
    // this id is the one which mongodb gives
});

//Deserialise --> When browser requests from server it gets id and from id it fetches the user from the cookie
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null, user);
    });
}); 


passport.use(
    new InstagramStrategy({
        // Options for Instagram strategy
        clientID: keys.instagram.clientID,
        clientSecret: keys.instagram.clientSecret,
        callbackURL: '/auth/instagram/redirect'
    },
    (accessToken, refreshToken, profile, done) =>{
        // Passport callback function
        console.log(profile);
        //Check if user already exists
        User.findOne({instaId:profile.id}).then((currentUser)=>{
            if(currentUser){
                //if user already exists
                console.log('User already exists ' + currentUser)
                done(null, currentUser);
            }
            else{
                //if user doesnt exists
                new User({
                    displayName: profile.displayName,
                    username: profile.username,
                    instaId: profile.id,
                    thumbnail: profile._json.data.profile_picture
                    }).save().then((newUser)=>{
                        console.log('New User Created ' + newUser);
                        done(null, currentUser);
                        });
            }
        })

        
        
    })
);

// if(userAccessToken != ''){
// module.exports = {
//     userAccessToken
// }
// }
