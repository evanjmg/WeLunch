var express  = require('express');
var router   = express.Router();
var app      = express();
var jwt      = require('jwt-simple');
var jwtauth  = require('./jwtauth.js');
var passport = require('passport');

// To remove later
app.set('jwtTokenSecret', process.env.WELUNCH_JWT_SECRET);

// Require the controllers, using the index
var usersController = require('../controllers/users');
// var eventsController = require('../controllers/events');
var homeController = require('../controllers/home');

var eventsController = require('../controllers/events');

// STATIC controller 
router.route('/login')
  .get(homeController.login);

router.route('/auth/linkedin')
  .get(passport.authenticate('linkedin', { 
    session: false, 
    scope: ['r_basicprofile', 'r_emailaddress'] 
  })
);

router.route('/')
  .get(jwtauth, homeController.home);

// USER controller
router.route('/api/users')
  .get(jwtauth, usersController.usersIndex)

router.route('/api/users/logout')
  .get(jwtauth, usersController.linkedinLogout);

router.route('/api/users/auth/linkedin/callback')
  .get(passport.authenticate('linkedin'), usersController.linkedinLogin);

router.route('/api/users/:id')
  .get(jwtauth, usersController.usersShow)
  .put(jwtauth, usersController.usersUpdate);


// EVENTS controller

router.route('/api/events/')
  .post(jwtauth, eventsController.eventsCreate)
  .get(jwtauth, eventsController.eventsIndex);
  
router.route('/api/events/:id')
  .put(jwtauth, eventsController.eventsUpdate) 
  .delete(jwtauth, eventsController.eventsDelete) 
  .get(jwtauth, eventsController.eventsShow); 



module.exports = router;