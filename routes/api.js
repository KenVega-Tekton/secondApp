const express = require("express");

const dishController = require("../controllers/dishes");

const apiRouter = express.Router();

apiRouter
  .route("/dish")
  .get(dishController.getDishes)
  .post(dishController.createDish);
/*.put(dishController.updateDish)
  .delete(dishController.deteleDish);*/

module.exports = apiRouter;
