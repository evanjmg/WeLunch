var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');
var LinkedInStrategy = require('passport-linkedin').Strategy;


module.exports = function(passport){
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	passport.deserializeUser(function(id, callback) {
		User.findById(id, function(err, user) {
			callback(err, user);
		});
	});

	passport.use('linkedin', new LinkedInStrategy({
		consumerKey: process.env.LINKEDIN_API_KEY,
		consumerSecret: process.env.LINKEDIN_SECRET_KEY,
		callbackURL: "http://127.0.0.1:8000/api/users/auth/linkedin/callback",
		scope: ['r_emailaddress', 'r_basicprofile'],
		profileFields   : ['name', 'emails' ]
	}, 

	function(token, tokenSecret, profile, done) {
		console.log(profile)
		process.nextTick(function() {
		}), 

		User.findOne({ 'linkedin.id' : person.id }, function(err, user) {
			if (err) return done(err);
			if (user) {
				return done(null, user);
			} else {

				var newUser = new User();
				newUser.linkedin.id           	= person.id;
				newUser.linkedin.access_token 	= access_token;
				newUser.name   									= person.firstName + ' ' + person.lastName;
				newUser.avatar   								= person.pictureUrl;
				newUser.local.email    = email;
				newUser.local.password = newUser.encrypt(password);

				newUser.save(function(err) {
					if (err) throw err;
					return done(null, newUser);
				});
			}
		});
	}));
  
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
          return callback(null, false, req.flash('signupMessage', 'This email is already used.'));
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

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    // Search for a user with this email
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) return callback(err);
     
     // If no user is found
      if (!user) return callback(null, false, req.flash('loginMessage', 'No user found.'));

      // Wrong password
      if (!user.validPassword(password))           return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

      return callback(null, user);
    });
  }));
 }