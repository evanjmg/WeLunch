var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
 
var userSchema = new mongoose.Schema({
  local: {
    name: String,
    email: String,
    password: String
  },
  linkedin: {
    _id: String,
    name:String,
    avatar: String,
    access_token: String,
},
})

var User = mongoose.model('User', userSchema);
module.exports = User;



