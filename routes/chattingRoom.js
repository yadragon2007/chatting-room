const express = require("express");
const router = express.Router();

const chattingRoomController = require("../controllers/chattingRoomController");

router.get("/PublicChatRoom", chattingRoomController.publicChatRoom_index_get);



module.exports = router;
