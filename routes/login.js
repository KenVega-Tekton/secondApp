const express = require("express");

const userController = require("../controllers/users");

const userRouter = express.Router();

userRouter.route("/signup").post(userController.createUser);
userRouter.route("/users/me").get(userController.getUser);

module.exports = userRouter;
