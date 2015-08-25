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
    var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
    if (decoded.exp <= Date.now()) res.status(400).send({ success: false, message : 'Access token has expired' });
    
    User.findOne({ _id: decoded.iss }, function(err, user) {
      if (err) return err;
      req.user = user;
      next();
    });
  } else {
    if (req.xhr) {
      return res.status(401).send({ success: false, message : 'Authentication failed' });
    }
    res.redirect("/login");
  }
};