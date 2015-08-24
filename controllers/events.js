var passport = require("passport");
var express = require('express');
var router = express();

var User = require('../models/user');
var Event = require('../models/event');
module.exports = router;

// POST - NEW EVENT 
router.post('/', function (req, res){
  Event.create(req.body, function (err){
    if (err) res.send(err)
    res.send({status: 201 });
  })
});
// INDEX - EVENTs
router.get('/', function (req, res) {
  Event.find(function (err,events) {
    if(err) res.send(err);
    res.json(events);
  } )
})


//need to add othwr error messages