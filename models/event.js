mongoose = require('mongoose');



var eventSchema = new mongoose.Schema({
  title: String,
   users: String,
   _owner: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
   },
  invites: [ { accepted: {type: Boolean, default: null },
   _invitee: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}}],
  start_time: Date,
  end_time: Date,
  location: String,
  latitude:String,
  longitude:String,
  message: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});


var Event = mongoose.model('Event', eventSchema);
module.exports = Event;

