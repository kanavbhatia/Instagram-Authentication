const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');  //This will tell where the passport is setuped to run it in the future otherwise instagram instance could not be found located in auth-routes 
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');

const app = express();

// Age of cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //in milli seconds
    keys: [keys.sessionCookie.cookieKey]
}));

// // Initialise Passport
app.use(passport.initialize());
app.use(passport.session()); //to control login

//set up a new engine
app.set('view engine', 'ejs');

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, ()=>{
    // useNewUrlParser: true
    console.log('Connected to MongoDB');
})


//setup routes
app.use('/auth',authRoutes)
app.use('/profile',profileRoutes)

//  create home route
app.get('/', (request,response)=>{
    response.render('home',{person: request.user});
});

app.listen(3003, ()=>{
    console.log('App running listening requests on Port 3003')
    if(passportSetup.userAccessToken){
      console.log('user access token' + passportSetup.userAccessToken)  
    }
})