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

//Francesca - seeding users for User Invite/Index page
// var Evan = User.create({'local.name': 'Evan', 'linkedin.location': 'London', 'linkedin.industry': 'Technology', 'linkedin.avatar': 'https://avatars3.githubusercontent.com/u/9342155?v=3&s=460'});
// var Francesca = User.create({'local.name': 'Francesca Tabor', 'linkedin.location': 'Haggerston, London', 'linkedin.industry': 'UX & Development', 'linkedin.avatar': 'https://avatars3.githubusercontent.com/u/12237892?v=3&s=460'});
// var Anvar = User.create({'local.name': 'Anvar', 'linkedin.location': 'Victoria, London', 'linkedin.industry': 'Technology', 'linkedin.avatar': 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/4/005/0b7/263/33a3052.jpg'});
// var Alex = User.create({'local.name': 'Alex Chin', 'linkedin.location': 'Liverpool Street', 'linkedin.industry': 'Technology', 'linkedin.avatar': 'https://avatars2.githubusercontent.com/u/40461?v=3&s=460'});
// var Hassan = User.create({'local.name': 'Hassan', 'linkedin.location': 'Oxford Street', 'linkedin.industry': 'Backend Development', 'linkedin.avatar': 'https://avatars0.githubusercontent.com/u/11295626?v=3&s=460'});
// var Emily = User.create({'local.name': 'Emily', 'linkedin.location': 'Surrey', 'linkedin.industry': 'Front End Web Development', 'linkedin.avatar': 'https://pbs.twimg.com/profile_images/608937787153330176/WQ62ZBKe.jpg'});

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