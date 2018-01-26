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

      console.log("que informacion trae este user: ", user);
      console.log("necesito la ruta : ", req.path);

      if (user.rol !== "Cajero" && req.path === "/dish") {
        //bloquear
        res.status(403).jsonp();
        return Promise.reject();
      }

      // mapear todas las rutas -- para chef, cajero y admin

      // ejm si esta accediendo a /api/dish con get y el rol es chef . bloquear (este sera de prueba pero se borrar depsues porque el chef si que deberia poder ver los platos y modificarlos)

      // ejm si esta accediendo a /api/orders con get y el rol es cajero . bloquear

      // el usuario devuelto debe tener un rol (que es el que esta en la BD)
      // entonces debe verificarse si ese rol tiene permiso para usar la ruta a la que hace el request

      //saca el rol que sale decodificado del token que llega
      // con ese rol sabes si el usuario puede hacer request a esa ruta o no
      // si no tiene permiso, respondele no

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
