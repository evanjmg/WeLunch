var express = require('express'), 
router = express.Router();

var jwtauth = require('../config/jwtauth.js');
router.use('/api/users', require('./users'));
router.use('/api/events', require('./events'));
var passport = require("passport");


//** GET - NEW USER - SIGN UP ************************
router.get('/login', function (req, res){
  res.render('./users/login.ejs');
});

// LOGIN LINKEDIN
router.get('/auth/linkedin',
  passport.authenticate('linkedin', { 
    session: false, 
    scope: ['r_basicprofile', 'r_emailaddress'] 
  })
);



// AUTHENTICATED

router.get('/', function (req, res) {  
  // if (req.user) {
  //   res.render('index.ejs');
  // } else {
  //   res.redirect('/api/users/login'); 
  // }
  res.render('index.ejs');
});

//** GET - LOGOUT USER ************************

router.get('/logout', function (req,res){
  req.logout();
  res.redirect('/login');
});


module.exports = router;


