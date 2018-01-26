const express = require("express");

const dishController = require("../controllers/dishes");
const orderController = require("../controllers/orders");
const authenticateMiddleware = require("../middleware/auth");

const apiRouter = express.Router();

apiRouter
  .route("/dish")
  .get(authenticateMiddleware, dishController.getDishes)
  .post(authenticateMiddleware, dishController.createDish);
/*.put(dishController.updateDish)
  .delete(dishController.deteleDish);*/

apiRouter
  .route("/order")
  .get(authenticateMiddleware, orderController.getOrders)
  .post(authenticateMiddleware, orderController.createOrder);

apiRouter
  .route("/order/:id")
  .put(authenticateMiddleware, orderController.updateOrder);

module.exports = apiRouter;
