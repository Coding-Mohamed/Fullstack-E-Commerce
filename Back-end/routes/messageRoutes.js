// routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// route for GET/Post messages.
router.post("/", messageController.sendMessage);
// router.get("/", messageController.getAllMessages);
// router.get("/:id", messageController.getMessageById);

module.exports = router;
