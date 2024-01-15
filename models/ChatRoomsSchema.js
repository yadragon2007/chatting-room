const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create User schema
const ChatSchema = new Schema({
  roomName: { type: String, required: true },

  messages: [
    {
      senderData: {
        name: { type: String },
        id: { type: String },
      },
      messageContent: { type: String },
      Time: { type: String },
    },
  ],
  privet: { type: Boolean, required: true, default: false },
  admin: { type: String, required: true },
  // roomId: { type: String, required: true },
  // roomPassword: { type: String },
  // roomMembers: { type: Array, required: true },
  online: { type: Array, default: [] },
});

const publicChat = mongoose.model("chatRooms", ChatSchema);

module.exports = publicChat;
