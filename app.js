const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup')  //This will tell where the passport is setuped to run it in the future otherwise instagram instance could not be found located in auth-routes 

const app = express();

//set up a new engine
app.set('view engine', 'ejs');

//setup routes
app.use('/auth',authRoutes)

//  create home route
app.get('/', (request,response)=>{
    response.render('home');
});

app.listen(3003, ()=>{
    console.log('App running listening requests on Port 3003')
})