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

module.exports = {
  createUser
};
