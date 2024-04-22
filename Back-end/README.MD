# E-Commerce Backend API

This project is a backend API built with Express and Node.js for an e-commerce store. It provides endpoints to manage products, users, orders, and authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Endpoints](#endpoints)
- [License](#license)

## Features

- User authentication (register, login) using JWT tokens
- CRUD operations for products, orders, and users
- Secure password hashing using bcrypt
- MongoDB database integration using Mongoose

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt.js

## Setup

### What you need

- Node.js and npm installed locally
- MongoDB installed and running locally or as a cloud service (e.g., MongoDB Atlas)
- Postman or similar tool for API testing

### Installation

1. Clone the repository:

   ```bash
    https://github.com/Coding-Mohamed/Fullstack-Ecommers.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Running the server:

   ```bash
   npm start
   ```

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

# license

- This project is licensed under the MIT License.
