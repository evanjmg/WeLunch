// Require the model for the function calls
var User = require('../models/user');

// List of controller methods

function usersIndex(req, res) {
  User.find(function(err, users) {
    if (err) res.status(403).send({ message: "An error occurred could not show users."});
    res.status(200).send({ users: users });
  })
};

function usersShow(req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) res.status(403).send({ message: "An error occurred could not show user."});
    if(user){
      return res.json(user);
    } else{
      res.json({ message: 'User was not found' });
    }
  });
};

function usersUpdate(req,res) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    res.redirect('/api/users/'+ user.id);
  })
}; 

function linkedinLogout(req, res){
  req.session.destroy(function (err) {
    res.redirect('/login');
  });
};

// Deprecated?
function linkedinLogin(req, res, next){
  if (!req.user) return res.json(401, { error: "No user found" });
  console.log(req.user)
  res.redirect("/");
};

module.exports = {
  usersIndex: usersIndex,
  usersShow: usersShow,
  usersUpdate: usersUpdate,
  linkedinLogout: linkedinLogout,
  linkedinLogin: linkedinLogin,
};


// router.post('', function (req, res) {
//   var signupStrategy = passport.authenticate('local-signup', {
//     successRedirect : '/',
//     failureRedirect : '/signup'
//   });
//   return signupStrategy(req,res);
// });

// router.post('/login', function(req, res, next) {
//   passport.authenticate('local-login', function(err, user, info) {
//     if (err) return next(err);
//     if (!user) return res.json(401, { error: "No user found" });
    
//     //user has authenticated correctly thus we create a JWT token 
//     var expires = moment().add('days', 7).valueOf();
//     var token = jwt.encode({
//       iss: current_user.id,
//       exp: expires
//     }, app.get('jwtTokenSecret'));

//     res.json({
//       token : token,
//     });
//   })(req, res, next);
// });

// router.get('/:id/edit', function(req, res){
//   User.findById(req.params.id, function (err, user) {
//     res.render('./users/edit', { user: user})
//   });
// })

// USER DELETE
// router.delete('/:id', function (req, res) {
//   User.findById(req.params.id, function (err, user) {
//     if (err) console.log(err);
//     user.remove();
//     res.redirect('/');
//   });
// });
