function login(req, res){
  res.render('users/login');
}

function home(req, res){
  res.render('index');
}
function usersIndex(req,res) {
	res.render('francesca_mobile')
}
module.exports = {
  login: login,
  home: home,
  usersIndex: usersIndex
}