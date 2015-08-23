var passport = require("passport");

var express = require('express');
var router = express();
var User = require('../models/user');
var Event = require('../models/event');
module.exports = router;

// GET - NEW USER - SIGN UP 
router.get('/signup', function (req, res){
  res.render('./users/new')
});

// POST - NEW USER - SIGN UP
router.post('/', function (req, res) {
 var signupStrategy = passport.authenticate('local-signup', {
   // invokes req.login method -we don't write it because we have a separate strategy
   successRedirect : '/',
   failureRedirect : '/signup',
   failureFlash    : true
 });
 return signupStrategy(req,res);
});
// GET - LOGIN USER - LOCAL
router.get('/login', function (req, res){
  res.render('./users/login', { message: req.flash('loginMessage')});
});
router.get('/auth/linkedin',
  passport.authenticate('linkedin'), 
  function(req, res){
});