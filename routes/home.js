const express = require("express");
const router = express.Router();

const home = require("../controllers/homeContoller");

router.get("/", home.homePage_index_get);
router.post("/getRooms", home.Rooms_feach_post);

module.exports = router;
