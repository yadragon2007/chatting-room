const express = require("express");
const router = express.Router();

const account = require("../controllers/accountController");

router.get("/login", account.login_login_get);
router.get("/signup", account.signUp_signUp_get);
router.post("/signup", account.signUp_signUp_post);
router.post("/login", account.login_login_post);
router.get("/login/err/:userName", account.loginErr_login_get);
router.get("/signup/err/:fullName/:userName", account.signUpErr_login_get);
router.get("/logout", account.logout_login_get);


module.exports = router;
