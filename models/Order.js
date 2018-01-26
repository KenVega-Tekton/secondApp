const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    state: {
      type: String,
      required: true,
      enum: ["comanda", "in process", "done"]
    },
    clientName: {
      type: String,
      required: true,
      minlength: 2
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    paymentType: {
      type: String,
      required: true,
      enum: ["card", "cash"]
    },
    total: {
      type: Number,
      required: true
    },
    orderDetails: [{ type: Schema.Types.Mixed, default: [] }]
  },
  { collection: "orderCollection" }
);

module.exports = mongoose.model("orders", OrderSchema);
