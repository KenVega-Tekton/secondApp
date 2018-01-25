const express = require("express");

const userController = require("../controllers/users");
const authenticateMiddleware = require("../middleware/auth");

const userRouter = express.Router();

userRouter.route("/signup").post(userController.createUser);
userRouter
  .route("/users/me")
  .get(authenticateMiddleware, userController.getUser);

module.exports = userRouter;
