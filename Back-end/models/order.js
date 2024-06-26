// order.js
// Define Order schema for MongoDB

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // Define order schema fields (e.g., user ID, products array)

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
