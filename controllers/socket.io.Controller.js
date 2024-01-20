const Accounts = require("../models/accountModel");
const Rooms = require("../models/ChatRoomsSchema.js");
const { time } = require("../API/Time");

const socket = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRoom", (userData, roomData) => {
      const { _id: userId, fullName } = userData;
      const { _id: roomId } = roomData;

      socket.join(roomId);
      io.to(roomId).emit("userJoined", fullName);
    });
    socket.on("sendMsg", (userData, roomData, msg, time) => {
      const { _id: userId, fullName } = userData;
      const { _id: roomId } = roomData;
      const newMessage = {
        senderData: {
          fullName: fullName,
          _id: userId,
        },
        messageContent: msg,
        Time: time,
      };
      io.to(roomId).emit("msgSent", newMessage);

      saveMsgInDataBase(newMessage, roomId);
    });
    socket.on("disconnect", () => {
      io.emit("sendId");
    });
  });

  // Check if a user with a specific socket ID is connected
  const isUserConnected = (socketId) => {
    return io.sockets.sockets.has(socketId);
  };
  // save Msg in data base
  const saveMsgInDataBase = async (message, roomId) => {
    const room = await Rooms.findById(roomId);
    let messages = room.messages;
    messages.push(message);
    await Rooms.findByIdAndUpdate(roomId, { messages });
    return;
  };
};

module.exports = socket;
