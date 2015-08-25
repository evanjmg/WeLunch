
var User = require('../models/user');
var Event = require('../models/event');

function invitesIndex(req, res) {
  Event.find({}).populate('_owner').populate('invites._invitees').exec( function (err, events) {

    if (err) res.status(403).send({ message: "An error occurred - Couldn't retreive invites"})

      var i=0; j=0; myInvitations=[];

    for(i;i< events.length;i++){
      for (j;j< events[i].invites.length; j++) {
        if (events[i].invites[j]._invitee == req.user.id) {
          myInvitations.push(events[i]);
          break;
        }
      }
    }
    if (myInvitations) { res.json(myInvitations) }
      else { 
        res.json({ message: "Could not find any invitations"}, myInvitations: myInvitations)}
      }); 
}

function invitesCreate (req, res) {
  Event.findOne({ _owner: req.user.id }, {}, { sort: { created_at: -1}, function (err, event) {

    if (err) res.status(403).send( { "Could not invite user. An error occurred"})
    // go through the event to see if the user was already invited.
  event.invites.push({ _invitee: req.body.id });
  event.save();
});
}

function invitesApprove (req, res) {
  Event.findById(req.body.event_id, function (err, event) {
    if (err) res.status(403).send({ message: "An error occurred. Please check your request"})
      var i=0;
    for (i;i < event.invites.length;i++) {
     if (event.invites[i]._invitee == req.body.user_id) {

      event.invites[i].accepted = true;
      event.save();
      res.status(203).send( { message: "Invite accepted for event!"})
    }
  }
});
}

function invitesDelete (req,res) {
  Event.findById(req.body.event_id, function (err, event) { 
    for (i;i < event.invites.length;i++) { 
      if (event.invites[i]._invitee == req.body.user_id) {
        event.invites[i].accepted = false;

        event.save();
        res.status(203).send({ message: "Invite deleted"})
      }

    }  
    res.status(400).send({ message: "Could not find user"});
  }
  );
}

module.exports = {
  invitesIndex: invitesIndex,
  invitesApprove: invitesApprove,
  invitesCreate: invitesCreate,
  invitesDelete: invitesDelete
}