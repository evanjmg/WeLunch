
var User = require('../models/user');
var Event = require('../models/event');

function eventsCreate (req, res){
  User.findById(req.user.id, function (err, user) {
    if (err) res.send(err);

    Event.create(req.body, function (err, event){
      if (err) res.send(err);
      event._owner = user.id;
      event.save();
      // res.send({status: 201 });
      res.json({ event: event})
    })
  }) 
}

// ALL OF OWNERS EVENTS
function eventsIndex (req, res) {
    Event.find({}).populate('_owner').populate('invites._invitees').exec(function (err,events) {
      if(err) res.status(401).send({ message: "There was a problem with your request"});

      var i=0,myEvents=[];
      for(i;i< events.length;i++){
        if(events[i]._owner == req.user.id) myEvents.push(events[i]);
      }
      res.json(myEvents);
    })
}


function eventsUpdate (req, res) {
  Event.findById(req.params.id,function(err, event) {
    if (err) res.status(403).send( { message: "Event not found or you don't own the event"});

    if (event._owner == req.user.id) {
      Event.findByIdAndUpdate(req.body, function (err, eventUpdated){
        if (err) res.status(403).send( {message:"Error occurred while updating your event" })
        res.status(203).send({ message: "Successfully updated event"})
      })
    } else {
      res.status(403).send({ mesage: "You don't own the event"});
    }

  });
}
function eventsDelete (req,res) {
  Event.findById(req.params.id, function (err,event) {
      if (event._owner == req.user.id) {
        res.status(204).send({ message: "Event Successfully Deleted"})
      } else {
        res.status(403).send({ message: " You don't own the event or event not found"})
      }
  })
}
function eventsShow (req, res) {
  Event.findById(req.params.id).populate('_owner').populate('invites._invitees').exec( function (err, event){
    if (err) res.status(400).send({ message: "An error occurred"})
    if (event) { return res.json(event); } 
    else { res.json({ message: 'Event not found'})}
  })
}
function eventsCurrent (req, res) {
  Event.findOne({ _owner: req.user.id }, {}, { sort: { created_at: -1} }).populate('_owner').populate('invites._invitees').exec( function (err, event) {
    res.json(event);
  })
}
// Tweet.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
//   console.log( post );
// });

module.exports = {
 eventsCreate: eventsCreate,
 eventsDelete: eventsDelete,
 eventsShow:eventsShow,
 eventsUpdate: eventsUpdate,
 eventsIndex: eventsIndex,
 eventsCurrent: eventsCurrent
}



