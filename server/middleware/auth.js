const UserModel = require("../models/User");

const authenticate = (req, res, next) => {
  let token = req.header("x-auth");

  UserModel.findByToken(token)
    .then((user) => {
      // method from Model
      if (!user) {
        console.log("this token/user does not exist");
        res.status(404).jsonp(); // MEJORAR
        return Promise.reject();
      }

      // the cashier can only post new orders. nothing more
      if (
        user.rol === "cajero" &&
        req.path === "/order" &&
        req.method !== "POST"
      ) {
        res.status(403).jsonp();
        return Promise.reject();
      }

      // the chef can't post or delete orders, only get them and update them
      if (
        user.rol === "chef" &&
        req.path === "/order" &&
        (req.method === "POST" || req.method === "DELETE")
      ) {
        res.status(403).jsonp();
        return Promise.reject();
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch((err) => {
      console.log("there was an error");
      res.status(401).jsonp(err);
    });
};

module.exports = authenticate;
