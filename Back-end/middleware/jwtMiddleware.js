// jwtMiddleware.js

const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  // Check if authorization header is present
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No authorization header provided" });
  }

  // Extract JWT token from authorization header
  const token = req.headers.authorization.split(" ")[1];

  // If no token is provided, return error
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded token data to request object
    req.userData = { userId: decodedToken.userId };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = jwtMiddleware;
