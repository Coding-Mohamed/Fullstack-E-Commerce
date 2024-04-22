// controllers/messageController.js
const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Bad Request" });
    }

    // Here you would typically save the message to your database
    // For example:
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};
