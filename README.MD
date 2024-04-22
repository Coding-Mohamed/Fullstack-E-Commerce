# Fullstack E-Commerce Platform

## Backend API (E-Commerce)

This project features a backend API built with Express and Node.js for an e-commerce store. It provides endpoints to manage products, users, orders, and authentication.

### Features

- User authentication (register, login) using JWT tokens
- CRUD operations for products, orders, and users
- Secure password hashing using bcrypt
- MongoDB database integration using Mongoose

### Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt.js

# Endpoints

Authentication

- POST /api/auth/register: Register a new user.
- POST /api/auth/login: Login and receive a JWT token.

Products:

- GET /api/products: Get all products.
- POST /api/products: Create a new product.
- GET /api/products/:id: Get a specific product by ID.
- PUT /api/products/:id: Update a product by ID.
- DELETE /api/products/:id: Delete a product by ID.

Orders:

- POST /api/orders: Create a new order.
- GET /api/orders: Get order history for the authenticated user.

Message:

- POST /api/message: Create a new message.

# Frontend (React E-Commerce Website)

A sleek e-commerce platform crafted with React, offering a delightful shopping experience. Explore products, manage your cart, and effortlessly place orders.

## Features:

- **Product Catalog:** Discover a diverse range of products.
- **Shopping Cart:** Easily add, remove, and adjust quantities of items in your cart.
- **User Authentication:** Secure login for a personalized shopping journey.
- **User-Friendly:** Enjoy a seamless and intuitive shopping experience.

## Technologies:

- **React:** Frontend library for building responsive user interfaces.
- **Redux:** Efficient state management, especially for the shopping cart.
- **React Router:** Smooth navigation with client-side routing.
- **Bootstrap:** Streamlined styling for an enhanced visual experience.
- **CSS:** Custom styling for a visually appealing and responsive design.

## Setup Instructions:

1. Clone the repository:

   ```bash
   https://github.com/Coding-Mohamed/Fullstack-E-Commerce
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application (Frontend):

   ```bash
   npm run dev

   ```

4. Running the server (Backend):
   ```bash
   npm start
   ```

### Note

Excited to share my first Fullstack Ecommers project and eagerly anticipating more to come!
