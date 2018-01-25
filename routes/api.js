const express = require("express");

const dishController = require("../controllers/dishes");
const authenticateMiddleware = require("../middleware/auth");

const apiRouter = express.Router();

apiRouter
  .route("/dish")
  .get(authenticateMiddleware, dishController.getDishes)
  .post(dishController.createDish);
/*.put(dishController.updateDish)
  .delete(dishController.deteleDish);*/

module.exports = apiRouter;
