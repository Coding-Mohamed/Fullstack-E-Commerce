// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//routes for product CRUD operations
router.get("/", productController.getProducts);
router.get("/:productId", productController.getProductById);
router.post("/", productController.addProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
module.exports = router;
