const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create User schema
const publicChatSchema = new Schema({
  senderData: {
    name:String,
    id:String,
  },
  receiverId: { type: String, required: true, default: "all" },
  message: { type: String, required: true },
  Time:{ type: String, required: true},
});

const publicChat = mongoose.model("publicChat", publicChatSchema);

module.exports = publicChat;
