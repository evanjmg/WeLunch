var express        = require('express');
var jwt            = require('jwt-simple');
var app            = express();
var sassMiddleware = require('node-sass-middleware');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var layouts        = require('express-ejs-layouts');
var morgan         = require('morgan');
var moment         = require('moment');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var MongoStore     = require('connect-mongo')(session);
var methodOverride = require('method-override');
var ejs            = require('ejs');
var flash        = require('connect-flash')
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

// Setup SASS directories
var path = require('path');

app.use(sassMiddleware({
    src: path.join(__dirname + '/sass'), 
    dest: path.join(__dirname + '/public/stylesheets'), 
    debug: true,
    force: true,
    prefix: '/stylesheets',
    outputStyle: 'compressed'
  }), express.static(__dirname + '/public'));
  // The static middleware must come after the sass middleware
  // app.use(express.static(__dirname + '/public'));


var databaseURL = process.env.MONGOLAB_URI ||'mongodb://localhost/welunch';
mongoose.connect(databaseURL);

var User = require('./models/user');
var Event = require('./models/event');



//  VIEWS
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(layouts);
app.use(morgan('dev'));

// SESSIONS
app.set('jwtTokenSecret', process.env.WELUNCH_JWT_SECRET);

require('./config/passport')(passport, app);

app.use(session({
  secret: "secret",
  saveUninitialized: false,
  resave: false,
   store: new MongoStore({mongooseConnection:mongoose.connection})
}));

// AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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