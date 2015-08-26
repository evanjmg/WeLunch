
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
        res.json({ message: "Could not find any invitations", myInvitations: myInvitations })}
      }); 
}

function invitesCreate (req, res) {
  Event.findOne({ _owner: req.user.userId }, {}, { sort: { created_at: -1} }, function (err, event) {

    if (err) res.json( { message: "Could not invite user. An error occurred"})
    // go through the event to see if the user was already invited.
  if(event) {
    var i=0; for(i;i < event.invites.length;i++) {
      if (event.invites[i]._invitee == req.body.userId) {
        res.json( { message: "This user is already invited to this event"});
      } 
    }
    event.invites.push({ _invitee: req.body.userId });
    event.save(function (err) {
      if (err) res.json({ message: "could not create invite"});
      res.json({ message: "invited user to event", event: event})
    });
    event.save();
    res.json(event);
  }
  else {
    res.json( { message: "There is no current event"})
  }
});
}

function invitesAccept (req, res) {
  Event.findById(req.body.eventId, function (err, event) {
    if (err) res.json({ message: "An error occurred. Please check your request"})
      var i=0;
    for (i;i < event.invites.length;i++) {
      console.log(event.invites[i]._invitee)
      if (event.invites[i]._invitee == req.user.id) {
        event.invites[i].accepted = true;
        event.save( function (err) {
          res.json( { message: "Invite accepted for event!", event: event})
        });
      } 
    }
  });
}

function invitesDelete (req,res) {
  Event.findById(req.body.eventId, function (err, event) { 
    if (err) res.json({ message: "an error occurred"})
    
    var i=0; for(i;i < event.invites.length;i++) { 
      if (event.invites[i]._invitee == req.body.userId) {
        console.log(event.invites[i])
        event.invites[i].remove();
        event.save(function (error) {
          if (error) res.json({message: "could not delete"})
        });
        res.json({ message: "Invite deleted"});
      }
    }  
  res.json({ message: "Could not find event"})
  });
}

module.exports = {
  invitesIndex: invitesIndex,
  invitesAccept: invitesAccept,
  invitesCreate: invitesCreate,
  invitesDelete: invitesDelete
}