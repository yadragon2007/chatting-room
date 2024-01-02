const Accounts = require("../models/accountModel");
const publicChat = require("../models/publicChatSchema.js");
const { time } = require("../API/Time");




const sendMsgPublic = async (msg, SenderId) => {
  // get sender Data
  const senderData = await Accounts.findById(SenderId);
  // get time
  let Time = `${time().hour.hour12}:${time().minutes}`;
  // message data
  const msgData = {
    senderData: {
      name: senderData.fullName,
      id: senderData._id,
    },
    message: msg,
    Time,
  };
  // save into database
  const publicMsg = new publicChat(msgData);
  await publicMsg.save();
  // return data to socket.io server
  return msgData;
};

const socket = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected via socket!");
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
    });

    socket.on("public msg", async (msg, senderId) => {
      // save Data on data base
      const data = await sendMsgPublic(msg, senderId);
      // send message to everyone in public chatroom
      io.emit("public msg", data, senderId);
    });
  });
};


module.exports = socket;