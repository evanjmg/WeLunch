var express = require('express');
var app = express();
var User = require('../models/user');
var jwt = require('jwt-simple');

app.set('jwtTokenSecret', 'welunchallday');

module.exports = function(req, res, next) {

  if (req.session.passport && req.session.passport.user && req.session.passport.user.token) {
    var cookie = req.session.passport.user.token;
  }

  var token = (cookie || 
               req.body && req.body.access_token) || 
              (req.query && req.query.access_token) || 
              req.headers['x-access-token'];

  if (token) {
    console.log(token);

    var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
    if (decoded.exp <= Date.now()) res.status(400).send({ success: false, message : 'Access token has expired' });
    
    User.findOne({ _id: decoded.iss }, function(err, user) {
      if (err) return err;

      console.log("********************************", user);
      req.user = user;
      next();
    });


  } else {
    return res.status(401).send({ success: false, message : 'Authentication failed' });
  }

  // if (token) {
  //   try {
  //     var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
  //     // if (decoded.exp <= Date.now()) res.end('Access token has expired', 400);
    
  //     User.findOne({ _id: decoded.iss }, function(err, user) {
  //       console.log("HHHHERRRRRRREEEEEEE!")
  //       console.log(user);

  //       req.user = user;
  //     });
  //   } catch (err) {
  //     return next();
  //   }
  // } else {
  //   next();
  // }
};