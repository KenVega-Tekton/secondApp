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

      // el usuario devuelto debe tener un rol (que es el que esta en la BD)
      // entonces debe verificarse si ese rol tiene permiso para usar la ruta a la que hace el request

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
