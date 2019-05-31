const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req,res)=>{
    res.render('login',{person: req.user});
});

// logout
router.get('/logout', (req,res)=>{
    // passport will handle
    // res.send('Logging out');
    req.logout();
    res.redirect('/');
});


// instagram login
router.get('/instagram', passport.authenticate('instagram',{
    scope: ['basic']
}));


// passport.authenticate('instagram') is acting as a middleware, if it authenticates with instagram then only
// it will redirect the page otherwise it will display the error


router.get('/instagram/redirect', passport.authenticate('instagram'),(req, res) => {
    // res.send(req.user)
    //send the response as the requested user
    res.redirect('/profile')
});
 

// instagram login
// router.get('/instagram', (req,res)=>{
//     // passport will handle
//     res.send('Login with Instagram');

// });


module.exports = router;



// (req,res)=>{
//     res.send('You have reached the callback URI')
// })