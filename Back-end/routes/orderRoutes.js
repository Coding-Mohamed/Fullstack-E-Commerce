// orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const jwtMiddleware = require("../middleware/jwtMiddleware");

//Routes for POST/GET orders.
router.post("/", jwtMiddleware, orderController.createOrder);
router.get("/", jwtMiddleware, orderController.getOrderHistory);
router.get("/:id", jwtMiddleware, orderController.getOrderHistoryById);

module.exports = router;
