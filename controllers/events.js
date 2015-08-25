
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
  Event.find({ _owner: req.user.id }).populate('_owner').populate('invites._invitees').exec(function (err,events) {
    if(err) res.json({ message: "There was a problem with your request"});
    res.json(events);
  })
}

function eventsUpdate (req, res) {
  Event.find( { _owner: req.user.id} ,{_id: req.params.id },function(err, event) {
    if (err) res.json( { message: "Event not found or you don't own the event"});
    Event.findByIdAndUpdate(event._id, req.body, function (error, eventUpdated) {
      if (err) res.json( {message:"Event not found or you don't own the event" })
        res.status(203).send({ message: "Successfully updated event"})
    })
  });
}
function eventsDelete (req,res) {
  Event.remove( {_owner: req.user.id, _id: req.params.id }, function (err) {
    if (err) res.status(403).send({ message: "An error occurred."})
      res.status(204).send({ message: "Event Successfully Deleted"})
  })
}
function eventsShow (req, res) {
  Event.findById(req.params.id).populate('_owner').populate('invites._invitees').exec( function (err, event){
    if (err) res.json({ message: "An error occurred"})
      if (event) { return res.json(event); } 
    else { res.json({ message: 'Event not found'})}
  })
}
function eventsCurrent (req, res) {
  Event.findOne({ _owner: req.user.id }, {}, { sort: { created_at: -1} }).populate('_owner').populate('invites._invitees').exec( function (err, event) {
    if(err) res.json({message: "An error occurred"})
    if (event) res.json(event);
    res.json({message: "You have no active events"});
  })
}


module.exports = {
 eventsCreate: eventsCreate,
 eventsDelete: eventsDelete,
 eventsShow:eventsShow,
 eventsUpdate: eventsUpdate,
 eventsIndex: eventsIndex,
 eventsCurrent: eventsCurrent
}



