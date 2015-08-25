var express        = require('express');
var jwt            = require('jwt-simple');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var layouts        = require('express-ejs-layouts');
var sassMiddleware = require('node-sass-middleware');
var morgan         = require('morgan');
var ejs            = require('ejs');
var moment         = require('moment');

var cookieParser   = require('cookie-parser');
var session        = require('express-session');
// var MongoStore     = require('connect-mongo')(session);

var databaseURL = process.env.MONGOLAB_URI ||'mongodb://localhost/welunch';
mongoose.connect(databaseURL);

//  VIEWS
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(layouts);
app.use(morgan('dev'));
app.set('views', __dirname + '/views')
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

// SESSIONS
app.set('jwtTokenSecret', process.env.WELUNCH_JWT_SECRET);

require('./config/passport')(passport, app);

app.use(session({
  secret: "secret",
  saveUninitialized: false,
  resave: false
}));

// AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());

// ACCESS CURRENT_USER IN VIEWS
app.use(function(req,res, next) {
  global.current_user = req.user;
  next();
});

// SASS Middleware
var srcPath = './scss';
var destPath = './public/css';

app.use('/css', sassMiddleware({
  src: srcPath,
  dest: destPath,
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static(__dirname + '/public'));

// Routes
app.use(require('./config/routes'));

// PORT
app.listen(process.env.PORT || 8000, function () {
	console.log('listening on port 8000 - WeLunch')
});