const UserModel = require("../models/User");

function createUser(req, res) {
  const newInstanceUser = new UserModel({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    rol: req.body.rol
  });

  newInstanceUser
    .save()
    .then(() => {
      return newInstanceUser.generateAuthToken();
      //res.status(200).jsonp(newUser)
    })
    .then(token => {
      res
        .status(200)
        .header("x-auth", token)
        .jsonp(newInstanceUser);
    })
    .catch(err => res.status(400).jsonp(err));
}

function getUser(req, res) {
  // this is a private route cause it needs the token (is using the middleware now)
  res.status(200).jsonp(req.user);
}

function signInUser(req, res) {
  /*const userSigningIn = {
    email: req.body.email,
    password: req.body.password
  };*/

  UserModel.findByCredentials(req.body.email, req.body.password)
    .then(user => {
      res.status(200).jsonp(user);
    })
    .catch(err => {
      res.status(400).jsonp();
    });
}

module.exports = {
  createUser,
  getUser,
  signInUser
};
