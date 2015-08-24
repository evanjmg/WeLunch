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
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
})

var User = mongoose.model('User', userSchema);
module.exports = User;


