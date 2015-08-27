function login(req, res){
  res.render('users/login');
}

function home(req, res){
  res.render('index');
}

// function menu(req,res) {
//   res.render('menu')
// }

function invitations (req, res) {
  res.render('events/invitations')
}

function eventShow(req,res) {
  res.render('events/show');
}

function eventsCreate(req,res) {
  res.render('create_event');
}
function usersIndex(req,res) {
  res.render('users/index')
}


module.exports = {
  login: login,
  home: home,
  eventShow: eventShow,
  usersIndex: usersIndex,
  eventsCreate: eventsCreate,
  invitations: invitations,
  // menu: menu
}