var passport = require("passport");
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Event = require('../models/event');

authenticatedUser = function (req,res,next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/api/users/login');
}


//** GET - ALL USERS ************************

router.get('/',  function (req, res) {
  User.find(function(err, users) {
    if (err) console.log(err);
    res.json (users)
  })
});
//** GET - NEW USER - SIGN UP ************************

router.get('/login', function (req, res){
  res.render('./users/login.ejs');
});



//** GET - NEW USER - SIGN UP ************************

router.get('/signup', function (req, res){
  res.render('./users/signup.ejs')
});

//** GET - USER SHOW ************************

router.get('/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) console.log(err)
      if(user){
        return res.json(user);
      } else{
        res.json({ message: 'User was not found' });
      }
    });
});


//** PUT - USER SHOW ************************

router.put('/:id', function (req,res) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    res.redirect('/api/users/'+ user.id);
  })
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





// LOGIN LINKEDIN
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
    failureRedirect : '/api/users/login',
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

// router.get('/:id/edit', function(req, res){
//   User.findById(req.params.id, function (err, user) {
//     res.render('./users/edit', { user: user})
//   });
// })


// USER DELETE
// router.delete('/:id', function (req, res) {
//   User.findById(req.params.id, function (err, user) {
//     if (err) console.log(err);
//     user.remove();
//     res.redirect('/');
//   });
// });

module.exports = router;