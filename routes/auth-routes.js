const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req,res)=>{
    res.render('login');
});

// logout
router.get('/logout', (req,res)=>{
    // passport will handle
    res.send('Logging out');
});


// instagram login
router.get('/instagram', passport.authenticate('instagram',{
    scope: ['basic']
}));

router.get('/instagram/redirect', (req,res)=>{
    res.send('You have reached the callback URI')
})

// instagram login
// router.get('/instagram', (req,res)=>{
//     // passport will handle
//     res.send('Login with Instagram');

// });


module.exports = router;