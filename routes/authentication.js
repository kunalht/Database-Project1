let express = require('express'),
    router = express.Router(),
    authenticationMiddleware = require('../middleware/authentication'),
    passport = require('passport')


router.get('/login', authenticationMiddleware.getLogin)
router.get('/register', authenticationMiddleware.getRegister)

// router.post('/register',(req,res)=>{
//     console.log("POSTED")
//     console.log(req.body)
// })
router.post('/login',
    passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/loginn'
    }));
router.post('/register',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/registerr'
    }));

// router.get("/register", middlewareObj.getRegister)
router.get('/logout',authenticationMiddleware.logout)

module.exports = router;