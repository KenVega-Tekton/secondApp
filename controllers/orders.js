const OrderModel = require("../models/Order");

function getOrders(req, res) {
  OrderModel.find()
    .then((orders) => {
      res.status(200).jsonp(orders);
    })
    .catch((err) => {
      res.status(400).jsonp(err);
    });
}

function createOrder(req, res) {
  const newOrderInstance = new OrderModel(req.body);

  newOrderInstance
    .save()
    .then((order) => {
      res.status(200).jsonp(order);
    })
    .catch((err) => {
      res.status(400).jsonp(err);
    });
}

module.exports = {
  getOrders,
  createOrder
};
