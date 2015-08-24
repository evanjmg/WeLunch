## OPTION 1 - EMBED EVERYTHING

var eventSchema = new mongoose.Schema({
  title: String,
  invitees: [User.schema],
  attendees: [User.schema],
  startTime: Date,
  endTime: Date,
  location: String,
  message: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

var userSchema = new mongoose.Schema({
  ownedEvents: [Event.schema],
  invitations: [Event.schema],
  attendedEvents: [Event.schema],
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
    location: String
},
})

## OPTION  2 - ADD INVITATIONS

var eventSchema = new mongoose.Schema({
  title: String,
  invitations: [Invitation.schema],
  start_time: Date,
  end_time: Date,
  location: String,
  message: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});
var userSchema = new mongoose.Schema({
  owned_events: [Event.schema],
  invitations: [Invitation.schema],
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
},
})