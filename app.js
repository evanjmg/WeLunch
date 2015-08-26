var express        = require('express');
var jwt            = require('jwt-simple');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var layouts        = require('express-ejs-layouts');
var morgan         = require('morgan');
var ejs            = require('ejs');
var moment         = require('moment');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
// var MongoStore     = require('connect-mongo')(session);

// Adding the sass middleware
var sassMiddleware = require('node-sass-middleware');
var path           = require('path');
app.use(
  sassMiddleware({
    src: __dirname + '/sass', 
    dest: __dirname + '/public/stylesheets', 
    debug: true, 
    outputStyle: 'compressed' 
  }),
  // The static middleware must come after the sass middleware
  express.static(path.join(__dirname, 'public'))
)

var databaseURL = process.env.MONGOLAB_URI ||'mongodb://localhost/welunch';
mongoose.connect(databaseURL);

var User = require('./models/user');
var Event = require('./models/event');

// User.create({'linkedin.name': 'Evan'});

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

// Routes
app.use(require('./config/routes'));

// PORT
app.listen(process.env.PORT || 8000, function () {
	console.log('listening on port 8000 - WeLunch')
});