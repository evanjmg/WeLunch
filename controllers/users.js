var passport = require("passport");
var express  = require('express');
var jwt = require('jwt-simple');
var app      = express();
var router   = express.Router();
var User     = require('../models/user');
var Event    = require('../models/event');
var moment   = require('moment');
var jwtauth = require('../config/jwtauth.js');
app.set('jwtTokenSecret', 'welunchallday');

// app.get('/something', [express.bodyParser(), jwtauth], function(req, res){
//   // do something
// });

// authenticatedUser = function (req,res,next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect('/api/users/login');
// }

// AUTHENTICATED
// router.get('/authenticated', function (req,res) {
//   console.log(current_user);
//   var expires = moment().add('days', 7).valueOf();
//   var token = jwt.encode({
//     iss: current_user.id,
//     exp: expires
//   }, app.get('jwtTokenSecret'));

//   res.json({
//     token : token,
//     expires: expires,
//     user: current_user
//   }); 
// })

//** GET - ALL USERS ************************

router.get('/', jwtauth, function (req, res) {
  User.find(function(err, users) {
    if (err) console.log(err);
    res.json(users)
  })
});

//** GET - NEW USER - SIGN UP ************************
router.get('/login', function (req, res){
  res.render('./users/login.ejs');
});

router.get('/logout', function (req, res){
  // ISSUE http://stackoverflow.com/questions/13758207/why-is-passportjs-in-node-not-removing-session-on-logout
  // req.logout();
  req.session.destroy(function (err) {
    console.log("HERE");
    res.redirect('/'); //Inside a callback… bulletproof!
  });
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

router.post('', function (req, res) {
 var signupStrategy = passport.authenticate('local-signup', {
   // invokes req.login method -we don't write it because we have a separate strategy
   successRedirect : '/',
   failureRedirect : '/signup'
 });
 return signupStrategy(req,res);
});


// LOGIN LINKEDIN
router.get('/auth/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] })
);

router.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin'), function(req, res, next){
    // if (err) return next(err);
    if (!req.user) return res.json(401, { error: "No user found" });
    console.log(req.user)
    res.redirect("/");
  });


//** POST - LOGIN USER - LOCAL ************************
router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) return next(err);

    if (!user) {
      return res.json(401, { error: "No user found" });
    }

    //user has authenticated correctly thus we create a JWT token 
   var expires = moment().add('days', 7).valueOf();
   var token = jwt.encode({
     iss: current_user.id,
     exp: expires
   }, app.get('jwtTokenSecret'));

   res.json({
     token : token,
     expires: expires,
     user: current_user
   });

  })(req, res, next);
});






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