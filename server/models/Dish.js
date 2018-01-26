const mongoose = require("mongoose");
const { Schema } = mongoose;

const DishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true,
      min: [5, "The price you gave is very low for this dish"],
      max: 40
    }
  },
  { collection: "dishCollection" }
);

module.exports = mongoose.model("DishModel", DishSchema);
// exporta el modelo creado basado en el esquema
