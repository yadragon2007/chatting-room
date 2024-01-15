const express = require("express");
const router = express.Router();

const chattingRoomController = require("../controllers/chattingRoomController");

router.post('/chatRoom/create',chattingRoomController.createChatRoom_index_post)
router.get('/chatRoom/:roomId',chattingRoomController.JoinChatRoom_publicRoom_get)


module.exports = router;
