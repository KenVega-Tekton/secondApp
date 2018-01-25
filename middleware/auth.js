const UserModel = require("../models/User");

const authenticate = (req, res, next) => {
  let token = req.header("x-auth");

  UserModel.findByToken(token)
    .then(user => {
      // method from Model
      if (!user) {
        res.status(404).jsonp();
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch(err => {
      res.status(401).jsonp(err);
    });
};

module.exports = authenticate;
