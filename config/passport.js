var User              = require('../models/user');
var passport 					= require('passport');
var LocalStrategy   	= require('passport-local').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy




// ============ PASSPORT SESSION SETUP

module.exports = function(passport){

	passport.serializeUser(function(user, done) {

		console.log(user.id);
    console.log('cool************')
		done(null, user);
	});

	passport.deserializeUser(function(id, callback) {
		User.findById(id, function(err, user) {
			callback(err, user);
		});
	});

// ============ LOCAL SIGNUP

passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
  	process.nextTick(function() {

  		User.findOne({ 'local.email' :  email }, function(err, user) {
  			if (err)
  				return done(err);
  			if (user) {
  				return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
  			} else {
  				var newUser = new User();
  				newUser.local.email = email;
  				newUser.local.password = newUser.generateHash(password);

  				newUser.save(function(err) {
  					if (err)
  						throw err;
  					return done(null, newUser);
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
				return callback(null, false, req.flash('loginMessage', 'No user found.'));
			}             if (!user.validPassword(password))
			return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
			return done(null, user);
		});
	})
})
);

  // ============ LINKEDIN LOGIN 

  passport.use('linkedin', new LinkedInStrategy({
  	clientID: process.env.LINKEDIN_API_KEY,
  	clientSecret: process.env.LINKEDIN_SECRET_KEY,
  	callbackURL: "http://127.0.0.1:8000/api/users/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
    state: true
  	// profileFields   : ['id','emails', 'location', 'industry']
  }, 

  function(token, tokenSecret, profile, done) {
  	console.log(profile)
  	process.nextTick(function() {
  	}), 

  	User.findOne({ 'linkedin.id' : profile.id }, function(err, user) {
  		if (err) return done(err);
  		if (user) {
  			return done(null, user);
  		} else {

  			var newUser = new User();
  			newUser.linkedin.id           	= profile.id;
  			newUser.linkedin.access_token 	= token;
  			// newUser.linkedin.name   				= profile.name.first-name + ' ' + profile.name.last-name;
  			// newUser.linkedin.location				= profile.location;
  			// newUser.linkedin.industry				= profile.industry;
  			// newUser.linkedin.avatar 				= profile._json.picture.data.url;
  			newUser.local.email 						= profile.email;
  			// newUser.local.password 					= newUser.encrypt(password);

  			newUser.save(function(err) {
  				console.log('saved!')
  				if (err) throw err;
  				return done(null, newUser);
  			});
  		}
  	});
  }));

// exports.isAuthenticated = function(req, res, next) {
// 	if (req.isAuthenticated()) return next();
// 	res.redirect('/login');
// };
}


