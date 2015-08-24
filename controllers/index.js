var express = require('express'), 
router = express.Router();
router.use('/api/users', require('./users'));
router.use('/api/events', require('./events'));
var passport = require("passport");

function home(req, res) {  
  res.render('/index.ejs');
}

module.exports = {
  home: home,
}

module.exports = router;

