function login(req, res){
  res.render('users/login');
}

function home(req, res){
  res.render('index');
}

function eventShow(req,res) {
  res.render('events/show');
}

function usersIndex(req,res) {
  res.render('users/index')
}

module.exports = {
  login: login,
  home: home,
  eventShow: eventShow,
  usersIndex: usersIndex
}