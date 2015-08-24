var passport = require("passport");
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Event = require('../models/event');

authenticatedUser = function (req,res,next) {
      if (req.isAuthenticated()) return next();
      res.redirect('/users/login');
}


//** GET - ALL USERS ************************

router.get('/users', authenticatedUser, function (req, res) {
  User.find(function(err, users) {
    if (err) console.log(err);
    res.json (users)
  })
});


//** GET - USER SHOW ************************

router.get('/users/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err){} console.log(err);
  }else if(user){
    return res.json(user);
  }else{
  res.json({ message: 'User was not found' });
        }
      });
    },


//** POST - USER SHOW ************************

router.post('/:id', authenticatedUser, function (req,res) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    res.redirect('/users/'+ user.id);
  })
}); 


//** GET - NEW USER - SIGN UP ************************

router.get('/signup', function (req, res){
  res.json({ message: 'Welcome to WeLunch'});
});


//** POST - NEW USER - SIGN UP ************************

router.post('/', function (req, res) {
 var signupStrategy = passport.authenticate('local-signup', {
   // invokes req.login method -we don't write it because we have a separate strategy
   successRedirect : '/',
   failureRedirect : '/signup',
   failureFlash    : true
 });
 return signupStrategy(req,res);
});


//** GET - LOGIN USER - LOCAL ************************

router.get('/login', function (req, res){
  res.render('./users/login'), res.json({ message: 'Success! You are now logged in'});
});

router.get('/auth/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] })
);

router.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/api/users/signup', successRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});


//** POST - LOGIN USER - LOCAL ************************

router.post('/login', function (req, res){
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/users/login',
    failureFlash    : true
  });
  return loginStrategy(req, res);
})


//** GET - LOGOUT USER ************************

router.get('/logout', function (req,res){
  req.logout();
  res.redirect('/');
});


//** EDIT USERS ************************

router.get('/:id/edit', authenticatedUser, function(req, res){
  User.findById(req.params.id, function (err, user) {
    res.render('./users/edit', { user: user})
  });
})


// USER DELETE
router.delete('/:id', authenticatedUser, function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) console.log(err);
    user.remove();
    res.redirect('/');
  });
});


module.exports = router;