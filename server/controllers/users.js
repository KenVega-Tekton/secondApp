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
      console.log("newInstanceUser: ", newInstanceUser);
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
  UserModel.findByCredentials(req.body.email, req.body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res
          .status(200)
          .header("x-auth", token)
          .jsonp(user);
      });
      //res.status(200).jsonp(user);
    })
    .catch(err => {
      res.status(400).jsonp();
    });
}

function deleteToken(req, res) {
  // ruta privada, debes estar logueado para hacer sign out
  req.user
    .removeToken(req.token)
    .then(() => {
      res.status(200).jsonp();
    })
    .catch(err => {
      res.status(400).jsonp(err);
    }); // instance method
}

module.exports = {
  createUser,
  getUser,
  signInUser,
  deleteToken
};
