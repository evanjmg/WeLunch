var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Event = mongoose.model('Event');
// var Invite = mongoose.model('Invite');

var userSchema = new mongoose.Schema({
  hosted_event: [Event.schema],
  // invites: [Invite.schema],
  local: {
    name: String,
    email: String,
    password: String,
    headline: String
  },
  linkedin: {
    url: String,
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


