const Accounts = require("../models/accountModel");
const ChatRoom = require("../models/ChatRoomsSchema.js");

const createChatRoom_index_post = async (req, res) => {
  const { userData } = req.cookies;
  const { roomName } = req.body;

  if (!userData) {
    res.redirect("/login");
  } else {
    const chatRoomData = {
      roomName,
      admin: userData._id,
    };
    const chatRoom = new ChatRoom(chatRoomData);
    await chatRoom.save();

    res.redirect("/");
  }
};
const JoinChatRoom_publicRoom_get = async (req, res) => {
  const { roomId } = req.params;
  const { userData } = req.cookies;

  const roomData = await ChatRoom.findById(roomId);

  res.render("publicRoom", {
    roomData,
    userData,
    messages: roomData.messages,
  });
};

module.exports = {
  createChatRoom_index_post,
  JoinChatRoom_publicRoom_get,
};
