const express = require("express");
const router = express.Router();

const home = require("../controllers/homeContoller");

router.get("/", home.homePage_index_get);

module.exports = router;
