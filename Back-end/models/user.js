// user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);

// // Inside models/user.js

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Encrypt password before saving
// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) return next();
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   user.password = hashedPassword;
//   next();
// });

// module.exports = mongoose.model("User", userSchema);
