var User              = require('../models/user');
var passport 					= require('passport');
var LocalStrategy   	= require('passport-local').Strategy;
var LinkedInStrategy  = require('passport-linkedin-oauth2').Strategy

var jwt = require('jwt-simple');
var moment         = require('moment');


// ============ PASSPORT SESSION SETUP
module.exports = function(passport, app){

	passport.serializeUser(function(token, done) {
    done(null, token);
	});

	passport.deserializeUser(function(token, done) {
    done(null, token);
	});

  // ============ LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    process.nextTick(function() {

      // Find a user with this e-mail
      User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err) return callback(err);

        // If there already is a user with this email 
        if (user) {
          return callback(null, false);
        } else {
        // There is no email registered with this email

          // Create a new user
          var newUser            = new User();
          newUser.local.email    = email;
          newUser.local.password = newUser.encrypt(password);

          newUser.save(function(err) {
            if (err) throw err;
            return callback(null, newUser);
          });
        }
      });
    });
  }));

  // ============ LOCAL LOGIN 
  passport.use('local-login', new LocalStrategy({
  	usernameField : 'email',
  	passwordField : 'password',
  	passReqToCallback : true
  }, function(req, email, password, callback) {
  	process.nextTick(function() {

  		User.findOne({ 'local.email' :  email }, function(err, user){
  			if (err) 
  				return callback(err);
  			if (!user) {
  				return callback(null, false);
  			}       
      if (!user.validPassword(password)) return callback(null, false); 
      return callback(null, user);
  		});

  	})
  })
);

  // ============ LINKEDIN LOGIN
  passport.use('linkedin', new LinkedInStrategy({
  	clientID: process.env.LINKEDIN_API_KEY,
  	clientSecret: process.env.LINKEDIN_SECRET_KEY,
  	callbackURL: "/api/users/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
    state: true
  	// profileFields   : ['id','emails', 'location', 'industry']
  }, function(token, tokenSecret, profile, done) {

  	process.nextTick(function() {
    	User.findOne({ 'local.email' : profile.emails[0].value }, function(err, user) {
    		if (err) return done(err);

    		if (user) {
    			return done(null, createJwt(user));
          
    		} else {
    			var newUser = new User();
    			newUser.linkedin.access_token 	= token;

    			newUser.local.name   				    = profile.displayName
          newUser.linkedin.location       = profile._json.location.name;
    			newUser.linkedin.url		        = profile._json.publicProfileUrl;
    			newUser.linkedin.industry				= profile._json.industry;
    			newUser.linkedin.avatar 				= profile.photos[0];
    			newUser.local.email 						= profile.emails[0].value;


    			newUser.save(function(err) {
    				console.log(response)
    				if (err) throw err;

    				return done(null, createJwt(newUser).token);
    			});
    		}
    	});
    });
  }));

  function createJwt(user){
    var expires = moment().add(7, 'days').valueOf();
    var token = jwt.encode({
      iss: user.id,
      exp: expires
    }, app.get('jwtTokenSecret'));

    return {
      token : token
    };
  }
}




