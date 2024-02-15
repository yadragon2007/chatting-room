const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create User schema
const userSchema = new Schema({
  fullName: { type: String, required: true },
  userName: { type: String, unique: true },
  password: { type: String },
  bio: { type: String },
  avatar: { type: String, default: "/img/user.webp" },
  method: { type: String },
});

const Accounts = mongoose.model("accounts", userSchema);

module.exports = Accounts;
