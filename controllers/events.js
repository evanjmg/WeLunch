var passport = require("passport");
var express = require('express');
var router = express.Router();
var jwtauth = require('../config/jwtauth.js');
var User = require('../models/user');
var Event = require('../models/event');

module.exports = router;


// POST - NEW EVENT 
router.post('/', function (req, res){
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
  
});

// INDEX of USER'S EVENTs
router.get('/', function (req, res) {
  Event.find(function (err,events) {
    if(err) res.send(err);
    res.json(events);
  })
})

router.get('/', function(req, res) {
  Event.find(function(err, events) {
    if (err) res.send(err);
    res.json(events);
  });
});

router.get('/showpage', function (req,res) {
  res.render('show_event.ejs')
})


// GET - EVENT SHOW
router.get('/:id', jwtauth, function (req, res) {
  Event.findById(req.params.id, function (err, event) {
    if (err) res.send(err);
      if(event){
        return res.json(event);
      } else{
        res.json({ message: 'Event not found' });
      }
    });
});

// POST - EVENT CREATE
router.post(function(req, res) {
 Event.create(req.body, function (err,event) {
  if (err) res.send(err);
  res.json({ message: 'Event has been successfuly saved', event: event})
}) 
});


// GET - NEW
router.get('/new', function (req,res) {
  res.render('create_event.ejs');
});

router.get('/events', function (req,res) {
  res.render('');
});


// PUT - EVENT UPDATE
router.put('/:id', function(req, res){
  Event.findByIdAndUpdate(req.params.id,req.body, function (err, event) {
    res.json({ message: "Event has been successfuly updated", event: event})
  });
});

