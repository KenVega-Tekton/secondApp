const express = require("express");

const dishController = require("../controllers/dishes");
const orderController = require("../controllers/orders");
const authenticateMiddleware = require("../middleware/auth");

const apiRouter = express.Router();

apiRouter
  .route("/dish")
  .get(authenticateMiddleware, dishController.getDishes)
  .post(dishController.createDish);
/*.put(dishController.updateDish)
  .delete(dishController.deteleDish);*/

apiRouter
  .route("/order")
  .post(authenticateMiddleware, orderController.createOrder);

module.exports = apiRouter;
