var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
var layouts        = require('express-ejs-layouts');
var sassMiddleware = require('node-sass-middleware');
var morgan         = require('morgan');
var ejs            = require('ejs');

var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var MongoStore     = require('connect-mongo')(session);


// MODELS 
var User  = require('./models/user');
var Event = require('./models/event');

var databaseURL = process.env.MONGOLAB_URI ||'mongodb://localhost/welunch';
mongoose.connect(databaseURL);


//  VIEWS
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(layouts);
app.set('views', __dirname + '/views')
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');


app.use(morgan('dev'));


// SESSIONS
require('./config/passport')(passport);
app.use(session({
	secret:'secret',
	maxAge: new Date(Date.now() + 3600000),
	store: new MongoStore({mongooseConnection:mongoose.connection})
}));



// AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());


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

// CONTROLLERS
app.use(require('./controllers'));


// PORT
app.listen(process.env.PORT || 8000, function () {
	console.log('listening on port 8000 - WeLunch')
});