function login(req, res){
  res.render('users/login');
}

function home(req, res){
  res.render('index');
}
function event(req,res) {
  res.render('show_event');
}
module.exports = {
  login: login,
  home: home,
  event: event
}