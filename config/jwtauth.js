var express = require('express');
var app = express();
var UserModel = require('../models/user');
var jwt = require('jwt-simple');
app.set('jwtTokenSecret', 'welunchallday');

module.exports = function(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
    try {
      var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
      if (decoded.exp <= Date.now()) {
        res.end('Access token has expired', 400);
      }
      User.findOne({ _id: decoded.iss }, function(err, user) {
        req.user = user;
      });
      

    } catch (err) {
      return next();
    }
  } else {
    next();
  }
};