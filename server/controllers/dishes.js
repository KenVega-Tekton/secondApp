const DishModel = require("../models/Dish");

function getDishes(req, res) {
  DishModel.find()
    .then(dishes => {
      if (!dishes) {
        // esto tiene sentido si find() puede retornar undefined
        return res.status(400).jsonp();
      }

      return res.status(200).jsonp(dishes);
    })
    .catch(err => {
      return res.status(500).jsonp(err);
    });
}

function createDish(req, res) {
  const newDishInstance = new DishModel({
    name: req.body.name,
    price: req.body.price
  });

  newDishInstance
    .save()
    .then(newDish => res.status(200).jsonp(newDish))
    .catch(err => res.status(400).jsonp(err));
}

module.exports = {
  getDishes,
  createDish
};
