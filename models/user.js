var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  local: {
    name: String,
    email: String,
    password: String
  },
  linkedin: {
    id: String,
    name: String, 
    location: String,
    industry: String,
    avatar: String,
    access_token: String,
  },
})

var User = mongoose.model('User', userSchema);


//********** Hash the Password for Security.

userSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});


module.exports = User;


