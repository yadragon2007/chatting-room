const Accounts = require("../models/accountModel");
const Rooms = require("../models/ChatRoomsSchema.js");
const { time } = require("../API/Time");

const socket = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id)
    // on user connect to the app
    socket.on("homePage", (userData) => {
      LeaveOfAllRooms(userData, io,socket);
    });
    // Joining a room
    socket.on("connectedToRoom", async (userData, roomData) => {
      const { _id: userId } = userData;
      const { _id: roomId } = roomData;
      if (!userId || !roomId) return;
      // join to the room
      socket.join(roomId);
      // get room Data
      const Room = await Rooms.findById(roomId);
      // add online user to room
      addOnlineUserToRoom(userData, Room, io);
      // send message aleart that there is user has connected to the room
    });

    socket.on('disconnect', () => {
      // cookies ya wad
    });
  });
};
// on user connect to the app
const LeaveOfAllRooms = async (userData, io,socket) => {
  const { _id: userId } = userData;

  const allRooms = await Rooms.find();
};

const addOnlineUserToRoom = async (userData, Room, io) => {
  const { _id: userId } = userData;
  const { _id: roomId } = Room;
  // get users that already connected
  let usersInTheSameRoom = Room.online;
  // check if user is already online
  if (usersInTheSameRoom.includes(userId) == true) return;
  // add the new User to the list of online Users in this chat-room
  usersInTheSameRoom.push(userId);
  // update the Chatroom with the new List of OnlineUsers
  await Rooms.findByIdAndUpdate(roomId, { online: usersInTheSameRoom });
  // send updated data to all clients in the same room
  // this event is sent with user data , room Id and the Number of the users in the same room
  const numberFoUsers = usersInTheSameRoom.length;
  io.emit(`connectedToRoom`, roomId, numberFoUsers);
};
const userConnectedToRoomMsg = async () => {};
// user left the room
const userLeftRoom = async (userId, roomId, io,socket) => {
  try {
    const Room = await Rooms.findById(roomId);
    let online = Room.online;
    const userIndex = online.indexOf(userId);
    // remove the disconneted user from the array of online users
    online.splice(userIndex, 1);
    // save the changes to the database
    await Rooms.findByIdAndUpdate(roomId, { online });
    // remove form the room 
    socket.leave(roomId);
  
  } catch (e) {
    console.log(e);
  }
};
module.exports = socket;
