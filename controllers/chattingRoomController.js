const Accounts = require("../models/accountModel");
const publicChat = require("../models/publicChatSchema.js");
const { time } = require("../API/Time");

const publicChatRoom_index_get = async (req, res) => {
  const { userData } = req.cookies;
  // check if user is logged in
  if (!userData) res.redirect("/login");

  const User = await Accounts.findById(userData._id);
  const msg = await publicChat.find();

  res.render("index", {
    title: "Public Chat Room",
    userData: User,
    msg,
  });
};

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

module.exports = {
  publicChatRoom_index_get,
  sendMsgPublic,
};
