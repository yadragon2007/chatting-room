const express = require("express");
const router = express.Router();

const settingControler = require("../controllers/settingControler");

router.get("/profile/setting/:type", settingControler.setting_setting_get);
router.post("/profile/setting/general", settingControler.generalSetting_setting_post);
router.post("/profile/setting/privacy", settingControler.passwordSetting_setting_post);
router.get("/profile/setting/:type/wrong-pass", settingControler.wrongPasswordSetting_setting_post);

module.exports = router;
