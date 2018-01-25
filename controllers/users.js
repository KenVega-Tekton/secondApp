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
    .then(newUser => res.status(200).jsonp(newUser))
    .catch(err => res.status(400).jsonp(err));
}

module.exports = {
  createUser
};
