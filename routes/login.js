const express = require("express");

const userController = require("../controllers/users");
const authenticateMiddleware = require("../middleware/auth");

const userRouter = express.Router();

userRouter.route("/signup").post(userController.createUser);
userRouter.route("/login").post(userController.signInUser);

userRouter
  .route("/users/me/token")
  .delete(authenticateMiddleware, userController.deleteToken);

userRouter
  .route("/users/me")
  .get(authenticateMiddleware, userController.getUser);

module.exports = userRouter;
