var User = require('../models/user');
var Event = require('../models/event');

function invitesIndex(req, res) {
  Event.find({})
    .populate('_owner')
    .populate('invites._invitees')
    .exec( function (err, events) {
      if (err) res.status(403).send({ message: "An error occurred - Couldn't retreive invites"})

      var i=0; 
      var j=0; 
      var myInvitations=[];

      for(i;i< events.length;i++){
        for (j;j< events[i].invites.length; j++) {
          if (events[i].invites[j]._invitee == req.user.id) {
            myInvitations.push(events[i]);
            break;
          }
        }
      }

      if (myInvitations) { 
        res.status(200).send(myInvitations); 
      } else { 
        res.status(404).send({ message: "Could not find any invitations", myInvitations: myInvitations })}
      }); 
}

function invitesPending(req, res) {
  Event.find( 
    { "invites": { "$elemMatch": { "_invitee": req.user.id, "accepted": null  } } }
  )
    .populate('_owner')
    .populate('invites._invitees')
      .exec( function (err, events) {
        if (err) res.status(403).send({ message: "Unable to retrieve invites."})

        if (events.length > 0) { 
          res.status(200).send({ invites: events, currentUserId: req.user._id}); 
        } else { 
          res.status(404).send({ message: "Could not find any invitations."});
        }
      }); 
}

function invitesCreate (req, res) {
  Event.findOne({ _owner: req.user.id }, {}, { sort: { created_at: -1} }, function (err, event) {
    if (err) res.json({ message: "Could not invite user. An error occurred"})
    
    // go through the event to see if the user was already invited.
    if (event) {
      var i=0; 
      for(i;i < event.invites.length;i++) {
        if (event.invites[i]._invitee == req.body.userId) {
          return res.status(403).send({ message: "This user is already invited to this event"});
        } 
      }
    
      event.invites.push({ _invitee: req.body.userId });
      event.save(function (err) {
        if (err) res.status(403).send({ message: "Could not create invite."});
        res.status(200).send({ message: "Invited user to event", event: event})
      });

    } else {
      res.status(404).send({ message: "There is no current event."})
    }; 
  });
}

function invitesAccept (req, res) {
  Event.findById(req.body.eventId, function (err, event) {
    if (err) res.json({ message: "An error occurred. Please check your request"})
    
    event.invites.forEach(function(invite) {
      if (invite._invitee == req.user.id) {
        invite.accepted = true;
      } 
    });

    event.save( function (err) {
      res.status(200).send({ 
        message: "Invite accepted for event!", 
        event: event
      })
    });
  });
}

function invitesDelete (req,res) {
  Event.findById(req.body.eventId, function (err, event) { 
    if (err) res.json({ message: "An error occurred"});

    event.invites.forEach(function(invite) {
      if (invite._invitee == req.user.id) 
        invite.remove();
    });

    event.save( function (err) {
      if (err) res.json({ message: "An error occurred"});
      res.status(200).send({ message: "Deleted" });
    });
  });
}

module.exports = {
  invitesPending: invitesPending,
  invitesIndex: invitesIndex,
  invitesAccept: invitesAccept,
  invitesCreate: invitesCreate,
  invitesDelete: invitesDelete
}