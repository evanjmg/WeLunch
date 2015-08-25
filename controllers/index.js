var express = require('express'), 
router = express.Router();
router.use('/api/users', require('./users'));
router.use('/api/events', require('./events'));
var passport = require("passport");

router.get('/', function (req, res) {  
  // if (req.user) {
  //   res.render('index.ejs');
  // } else {
  //   res.redirect('/api/users/login'); 
  // }
  res.render('index.ejs');
});

module.exports = router;


