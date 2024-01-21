const Accounts = require("../models/accountModel");
const Rooms = require("../models/ChatRoomsSchema.js");
const { time } = require("../API/Time");

const socket = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRoom", async (userData, roomData) => {
      const { _id: userId, fullName } = userData;
      const { _id: roomId } = roomData;

      socket.join(roomId);
      const users = io.sockets.adapter.rooms.get(roomId).size;

      await Rooms.findByIdAndUpdate(roomId, { online: users });

      io.emit("updateRooms");
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
      desconnectedUser(io);
    });
  });

  // handle user disconnection
  const desconnectedUser = async (io) => {
    // الفكرة دي مش صح علشان هتعمل لود جامد يا برنس
    // الكلام ده زبالة و لازم يتعدل
    const rooms = await Rooms.find();

    rooms.forEach(async (room) => {
      const { id: roomId } = room;
      let users = io.sockets.adapter.rooms.get(roomId);
      if (users == undefined) users = { size: 0 };
      // console.log(users)
      await Rooms.findByIdAndUpdate(roomId, { online: users.size });
    });

    io.emit("updateRooms");
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
