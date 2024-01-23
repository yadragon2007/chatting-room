const Accounts = require("../models/accountModel");
const Rooms = require("../models/ChatRoomsSchema.js");
const { time } = require("../API/Time");

const socket = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRoom", async (userData, roomData) => {
      const { _id: userId, fullName } = userData;
      const { _id: roomId } = roomData;
      const socketId = socket.id;

      let { online } = await Rooms.findById(roomId);
      // const p = []
      // check if the user is already online
      const check = online.find((user) => user.userId == userId);

      if (check) {
        const onlineUserIds = online.indexOf(check);
        online[onlineUserIds].ioId.push(socketId);
        await Rooms.findByIdAndUpdate(roomId, { online });
      } else {
        // add new user to the list of users in this chat room
        online.push({
          userId: userId,
          ioId: [socketId],
        });
        socket.join(roomId);
        await Rooms.findByIdAndUpdate(roomId, { online });
        io.emit("updateRooms");
      }
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
      const socketId = socket.id;

      desconnectedUser(socketId, io);
    });
  });

  // handle user disconnection
  const desconnectedUser = async (socketId, io) => {
    const rooms = await Rooms.find();

    rooms.forEach((room) => {
      let { online } = room;
      const check = online.find((user) => user.ioId.includes(socketId) == true);
      if (check) deleteUserFromRoomDotOnline(socketId, check, room, io);
    });

    return;
  };
  const  deleteUserFromRoomDotOnline  = async (
    socketId,
    onlineObject,
    room,
    io
  ) => {
    let { online, _id: roomId } = room;
    if (onlineObject.ioId.length == 1) {
      const index = online.indexOf(onlineObject);
      online.splice(index, 1);
      await Rooms.findByIdAndUpdate(roomId, { online });
      io.emit("updateRooms");
    } else {
      const userIndex = onlineObject.ioId.indexOf(socketId);
      onlineObject.ioId.splice(userIndex, 1);
      const index = online.indexOf(onlineObject);
      online[index] = onlineObject;
      await Rooms.findByIdAndUpdate(roomId, { online });
    }
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
