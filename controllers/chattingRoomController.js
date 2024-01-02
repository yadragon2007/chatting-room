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



module.exports = {
  publicChatRoom_index_get,
};
