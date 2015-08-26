var express = require('express'), 
router = express.Router();
router.use('/api/users', require('./users'));
router.use('/api/events', require('./events'));
var passport = require("passport");

// TEMPORARY PAGES
router.get('/event', function (req,res) {
res.render('show_event')
})
router.get('/', function (req, res) {  
  // if (req.user) {
  //   res.render('index.ejs');
  // } else {
  //   res.redirect('/api/users/login'); 
  // }
  res.render('index.ejs');
});

router.get('/francesca/mobile', function (req, res) {  
  res.render('francesca_mobile.ejs');
});

module.exports = router;


