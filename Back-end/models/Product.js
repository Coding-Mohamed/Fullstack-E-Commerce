// models/product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String }], // För att lagra flera bilder kan du använda en array av strängar
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
