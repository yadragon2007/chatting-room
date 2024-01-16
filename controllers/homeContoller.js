const Accounts = require("../models/accountModel");
const ChatRooms = require("../models/ChatRoomsSchema");

const homePage_index_get = async (req, res) => {
  const { userData } = req.cookies;

  if (userData) {
    // get user Data
    const account = await Accounts.findById(userData._id);
    res.cookie("userData", account);

    // get public rooms
    const publicRooms = await ChatRooms.find({ privet: false });

    // handle privet rooms
    const allPrivetRooms = await ChatRooms.find({ privet: true });
    let privetRooms = [];
    privetRooms.forEach((room) => {
      if (room.roomMembers.includes(account.id)) {
        privetRooms.push(room);
      }
    });

    // put privet rooms and public rooms in one array
    const chatRooms = [...publicRooms, ...privetRooms];

    // render index.ejs
    res.render("index", {
      userData: account,
      chatRooms,
    });
  } else {
    res.redirect("/login");
  }
};

const Rooms_feach_post = async (req, res) => {
  const { userId } = req.body;
  // get public rooms
  const publicRooms = await ChatRooms.find({ privet: false });

  // handle privet rooms
  const allPrivetRooms = await ChatRooms.find({ privet: true });
  let privetRooms = [];
  privetRooms.forEach((room) => {
    if (room.roomMembers.includes(account.id)) {
      privetRooms.push(room);
    }
  });

  // put privet rooms and public rooms in one array
  const chatRooms = [...publicRooms, ...privetRooms];

  res.json(chatRooms)
};

module.exports = {
  homePage_index_get,
  Rooms_feach_post,
};
