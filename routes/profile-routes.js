const router = require('express').Router();

const authCheck = (req,res,next)=>{
    if(!req.user){
        //User not logged in
        res.redirect('auth/login')
    }
    else{
        //User is logged in
        next()
        // means to proceed ahead
    }
}

router.get('/', authCheck, (req,res)=>{
    // res.send('You are logged in as ' + req.user.username)
    res.render('profile',{person: req.user});
})

module.exports = router;