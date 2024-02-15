const Accounts = require("../models/accountModel");
const bcrypt = require("bcrypt");
// const ChatRoom = require("../models/ChatRoomsSchema.js");

const setting_setting_get = async (req, res) => {
  const { userData } = req.cookies;
  const { type } = req.params;

  if (userData) {
    const newData = await Accounts.findById(userData._id);
    res.cookie("userData", newData);
    res.render("setting", {
      userData: newData,
      type,
      wrongPass:false
    });
  } else {
    res.redirect("/login");
  }
};

const generalSetting_setting_post = async (req, res) => {
  const updatedUserData = req.body;
  const { _id } = req.cookies.userData;
  await Accounts.findByIdAndUpdate(_id, updatedUserData);
  res.redirect("/profile/setting/general");
};

const passwordSetting_setting_post = async (req, res) => {
  const { userData } = req.cookies;
  const { oldPassword, newPassword } = req.body;

  const check = await bcrypt.compare(oldPassword, userData.password);
  if (check) {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await Accounts.findByIdAndUpdate(userData._id, {
      password: hashedNewPassword,
    });
    res.redirect("/profile/setting/privacy");
  } else {
    res.redirect("/profile/setting/privacy/wrong-pass");
  }
};

const wrongPasswordSetting_setting_post = async (req, res) => {
  const { userData } = req.cookies;
  const { type } = req.params;

  if (userData) {
    const newData = await Accounts.findById(userData._id);
    res.cookie("userData", newData);
    res.render("setting", {
      userData: newData,
      type,
      wrongPass:true
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  setting_setting_get,
  generalSetting_setting_post,
  passwordSetting_setting_post,
  wrongPasswordSetting_setting_post,
};
