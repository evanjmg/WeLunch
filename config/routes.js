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
var homeController = require('../controllers/home');
var eventsController = require('../controllers/events');
var invitesController = require('../controllers/invites');


// HOME controller 
router.route('/login')
  .get(homeController.login)
  .post(passport.authenticate('local-login', 
    { successRedirect : '/redirect', 
    failureRedirect : '/login' }));


// router.route('/menu')
//   .get(homeController.menu);

router.route('/users')
  .get(jwtauth,homeController.usersIndex);

router.route('/invitations')
  .get(jwtauth,homeController.invitations);

router.route('/events/show')
  .get(jwtauth,homeController.eventShow);

router.route('/event')
  .get(jwtauth,homeController.eventShow);

router.route('/events/create')
  .get(jwtauth,homeController.eventsCreate)

router.route('/auth/linkedin')
  .get(passport.authenticate('linkedin', { 
    session: false, 
    scope: ['r_basicprofile', 'r_emailaddress'] 
  })
);

  
router.route('/signup').post(passport.authenticate('local-signup', { successRedirect : '/redirect',
   failureRedirect : '/login', successFlash: 'You created your account. Please login.'             
        , failureFlash: 'Sign up failed. Please try again.'    }));

router.route('/')
  .get(jwtauth, homeController.home);

// USER controller
router.route('/api/users')
  .get(jwtauth, usersController.usersIndex)
  router.route('/api/users.json')
    .get(jwtauth, usersController.usersIndex);

router.route('/api/users/logout')
  .get(jwtauth, usersController.linkedinLogout);

router.route('/api/users/auth/linkedin/callback')
  .get(passport.authenticate('linkedin'), usersController.linkedinLogin);

router.route('/api/users/:id')
  .get(jwtauth, usersController.usersShow)
  .put(jwtauth, usersController.usersUpdate)
  .delete(jwtauth, usersController.usersDelete);

router.route('/redirect')
  .get(jwtauth, usersController.redirectTo);
// EVENTS controller
router.route('/api/events/')
  .post(jwtauth, eventsController.eventsCreate)
  .get(jwtauth, eventsController.eventsIndex);

router.route('/api/events/current')
    .get(jwtauth, eventsController.eventsCurrent); 

router.route('/api/events/:id')
  .put(jwtauth, eventsController.eventsUpdate) 
  .delete(jwtauth, eventsController.eventsDelete) 
  .get(jwtauth, eventsController.eventsShow);

// INVITES controller
router.route('/api/invites/')
  .get(jwtauth, invitesController.invitesIndex)
  .post(jwtauth,invitesController.invitesCreate)
  .delete(jwtauth, invitesController.invitesDelete);

router.route('/api/invites/pending')
  .get(jwtauth, invitesController.invitesPending);

router.route('/api/invites/accept')
  .post(jwtauth, invitesController.invitesAccept)

module.exports = router;