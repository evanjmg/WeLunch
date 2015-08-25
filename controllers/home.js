function login(req, res){
  res.render('users/login');
}

function home(req, res){
  res.render('index');
}

module.exports = {
  login: login,
  home: home
}