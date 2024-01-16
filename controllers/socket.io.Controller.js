const Accounts = require("../models/accountModel");
const Rooms = require("../models/ChatRoomsSchema.js");
const { time } = require("../API/Time");

const socket = (io) => {
  io.on("connection", (socket) => {
    socket.join(socket.id);
    io.to(socket.id).emit("addId");

    socket.on("joinRoom", (userData, RoomData) => {
      socket.join(RoomData._id);
    });
    socket.on("disconnect", () => {

    });
  });
};

module.exports = socket;
