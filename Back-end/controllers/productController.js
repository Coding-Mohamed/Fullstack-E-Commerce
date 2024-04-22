// controllers/productController.js
const Product = require("../models/Product");
const { ObjectId } = require("mongodb"); // Import ObjectId

// Logic to get all products
exports.getProducts = async (req, res) => {
  try {
    // Fetch products from the database
    const products = await Product.find();

    // Send products as JSON response
    res.json(products);
  } catch (error) {
    // Handle errors
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }

  // res.send("Get all products");

  // res.json([
  //   {
  //     _id: "1",
  //     name: "Airpods Wireless Bluetooth Headphones",
  //     image: "/images/airpods.jpg",
  //     description: "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
  //     brand: "Apple",
  //     category: "Electronics",
  //     price: 89.99,
  //     countInStock: 10,
  //     rating: 4.5,
  //     numReviews: 12,
  //   },
};

// Logic to get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId; // Get the product ID from request parameters
    const product = await Product.findById(productId); // Find product by ID

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logic to add new products to the database
exports.addProduct = async (req, res) => {
  const product = new Product({
    _id: req.body._id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    images: req.body.images,
    countInStock: req.body.countInStock,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Logic to add a new product to the database
exports.updateProduct = async (req, res) => {
  // Logic to update a product in the database
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.countInStock = req.body.countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Logic to delete a product from the database
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};
