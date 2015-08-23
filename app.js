var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var layouts        = require('express-ejs-layouts');
var sassMiddleware = require('node-sass-middleware');
var morgan         = require('morgan');
var ejs            = require('ejs');
var flash 				 = require('connect-flash');

// how do we do flashes in ajax?

var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var MongoStore     = require('connect-mongo')(session);


// MODELS 
var User  = require('./models/user');
var Event = require('./models/event');

var databaseURL = process.env.MONGOLAB_URI ||'mongodb://localhost/welunch';
mongoose.connect(databaseURL);


//  VIEWS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(layouts);
app.set('views', __dirname + '/views')
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));


// SESSIONS
require('./config/passport')(passport);
app.use(session({
	secret:'secret',
	maxAge: new Date(Date.now() + 3600000),
	store: new MongoStore({mongooseConnection:mongoose.connection})
}));
app.use(cookieParser());


// AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// SASS Middleware
var srcPath = './public/sass';
var destPath = './public/styles';

app.use('/', sassMiddleware({
	src: srcPath,
	dest: destPath,
	debug: true,
	outputStyle: 'expanded'
}));


// CONTROLLERS
app.use(require('./controllers'));


// PORT
app.listen(process.env.PORT || 8000, function () {
	console.log('listening on port 8000 - WeLunch')
});