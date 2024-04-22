// orderController.js
const mongoose = require("mongoose");
const Order = require("../models/order.js");

exports.createOrder = async (req, res) => {
  try {
    if (!Array.isArray(req.body.products)) {
      return res.status(400).json({ message: "Invalid products array" });
    }

    for (const product of req.body.products) {
      if (!product.productId || !product.quantity) {
        return res.status(400).json({ message: "Each product must have a productId and quantity" });
      }

      // Check if productId is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(product.productId)) {
        return res.status(400).json({ message: "Invalid productId" });
      }
    }

    const order = new Order({
      userId: req.userData.userId,
      products: req.body.products,
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: "Order created successfully", order: savedOrder });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userData.userId }).populate("products.productId");
    res.json(orders);
  } catch (err) {
    console.error("Error getting order history:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOrderHistoryById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.userData.userId }).populate("products.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Error getting order by ID:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
