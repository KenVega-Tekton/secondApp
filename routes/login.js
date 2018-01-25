const express = require("express");

const userController = require("../controllers/users");

const userRouter = express.Router();

userRouter.route("/signup").post(userController.createUser);

module.exports = userRouter;
