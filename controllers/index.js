var express = require('express'), 
router = express.Router();
router.use('/api/users', require('./users'));
router.use('/api/events', require('./events'));
var passport = require("passport");

router.get('/', function (req,res) {
	res.render('/new.ejs');
})

module.exports = router;


