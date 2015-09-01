// Require the model for the function calls
var Event = require('../models/event');
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

function usersDelete(req,res) {
  User.findByIdAndRemove(req.params.id,function (err) { if(err) res.json({ message: "an error occurred."});
    res.json({ message: "Deleted User"})
  });

}
function usersUpdate(req,res) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    res.json(user, { message: "updated user"});
  })
}; 

function linkedinLogout(req, res){
  req.session.destroy(function (err) {
    res.redirect('/login');
  });
};

function linkedinLogin(req, res, next){
  redirection(req,res);
};
function redirectTo (req,res) {
redirection(req,res);
}

function localsigninResponse (req,res) {
 redirection(req,res);
}
function localLoginResponse (req,res) {
redirection(req,res);
}

function redirection (req,res) {
  if (!req.user) return res.json(401, { error: "No user found" });
  
  Event.find( 
      { "invites": { "$elemMatch": { "_invitee": req.user.id, "accepted": null  } } }
    )
      .populate('_owner')
      .populate('invites._invitees')
        .exec( function (err, events) {
        if (events.length > 0) {
          return res.redirect("/invitations");
        }

        Event.findOne({ _owner: req.user.id }, {}, { sort: { created_at: -1} }
          , function (err, event) {
            if (event) { 
              return res.redirect("/events/show");
            } else {
              return res.redirect("/")
            }
          });
      });
}
module.exports = {
  redirectTo: redirectTo,
  usersIndex: usersIndex,
  usersShow: usersShow,
  usersUpdate: usersUpdate,
  linkedinLogout: linkedinLogout,
  linkedinLogin: linkedinLogin,
  usersDelete: usersDelete
};