// authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

// User registration
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({ email, password: hashedPassword });

    // Save the user to the database
    await user.save();

    // Generate JWT token for the newly registered user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("Token generated:", token);

    // Return the token in the response
    res.status(201).json({ message: "User created seccessfully", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the provided password matches the hashed password stored in the database
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    // Log the result of the password comparison
    console.log("Password comparison result:", validPassword);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token for the logged-in user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
