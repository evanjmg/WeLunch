var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');
var LinkedInStrategy = require('passport-linkedin').Strategy;

var LINKEDIN_API_KEY = "--insert-linkedin-api-key-here--";
var LINKEDIN_SECRET_KEY = "--insert-linkedin-secret-key-here--";

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
		consumerKey: LINKEDIN_API_KEY,
		consumerSecret: LINKEDIN_SECRET_KEY,
		callbackURL: "http://127.0.0.1:8000/api/users/auth/linkedin/callback",
		scope: ['r_emailaddress', 'r_basicprofile'],
		profileFields   : ['name', 'emails', ]
	}, function(token, tokenSecret, profile, done) {
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
				newUser.emailaddress 						= person.emailaddress[0].value;

				newUser.save(function(err) {
					if (err) throw err;
					return done(null, newUser);
				});
			}
		});
	}));
}