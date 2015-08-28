var Event = require('../models/event');

function login(req, res){
  res.render('users/login');
}

function home(req, res){
  res.render('index');
}

// function menu(req,res) {
//   res.render('menu')
// }

function invitations (req, res) {
  // Event.find( 
  //   { "invites": { "$elemMatch": { "_invitee": req.user.id, "accepted": null  } } }
  // )
  //   .populate('_owner')
  //   .populate('invites._invitees')
  //     .exec( function (err, events) {
  //       if (err) res.status(403).send({ message: "Unable to retrieve invites."})

  //       if (events.length > 0) { 
          res.render('events/invitations');
      //   } else { 
      //   res.redirect('/events/create');
      // } }); 

}

function eventShow(req,res) {
  res.render('events/show');
}

function eventsCreate(req,res) {
  res.render('create_event');
}
function usersIndex(req,res) {
  res.render('users/index')
}


module.exports = {
  login: login,
  home: home,
  eventShow: eventShow,
  usersIndex: usersIndex,
  eventsCreate: eventsCreate,
  invitations: invitations,
}