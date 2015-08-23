var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
 
var userSchema = new mongoose.Schema({
  local: {
    name: String,
    email: String,
    password: String
  },
  linkedin: {
    firstName:String,
    headline: String,
    id: String,
    lastName: String,
    pictureUrl: String,
    emailaddress: String,
},
})

var User = mongoose.model('User', userSchema);
module.exports = User;



