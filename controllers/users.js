var passport = require("passport");
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Event = require('../models/event');
// app.set('views', __dirname + '/views')
// app.engine('ejs', ejs.renderFile);
// app.set('view engine', 'ejs');

// GET - NEW USER - SIGN UP 
router.get('/signup', function (req, res){
	res.render('./users/signup.ejs');
});

// POST - NEW USER - SIGN UP
router.post('/', function (req, res) {
	var signupStrategy = passport.authenticate('local-signup', {
   // invokes req.login method -we don't write it because we have a separate strategy
   successRedirect : '/',
   failureRedirect : '/users/signup',
   failureFlash    : true
 });
	return signupStrategy(req,res);
});
// GET - LOGIN USER - LOCAL
router.get('/login', function (req, res){
	res.render('./users/login');
});
router.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/api/users/signup', successRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/auth/linkedin',
	passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }), 
	function(req, res){
	});


module.exports = router;