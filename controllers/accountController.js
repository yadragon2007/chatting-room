const Accounts = require("../models/accountModel");
const bcrypt = require("bcrypt");

const login_login_get = (req, res) => {
  res.render("login", {
    err: false,
    userName: "",
  });
};
const signUp_signUp_get = (req, res) => {
  res.render("signUp", {
    err: false,
    userName: "",
    fullName: "",
  });
};

const signUp_signUp_post = async (req, res) => {
  const { fullName, userName, password } = req.body;
  // check if user name is unique
  const check = await Accounts.findOne({ userName });
  if (!check) {
    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // handle data that will send to data base
    const account = new Accounts({
      fullName,
      userName,
      password: hashedPassword,
    });
    // save data into the data base
    const userData = await account.save();
    // save user Data in the cookies
    res.cookie("userData", userData, {
      secure: true,
      maxAge: 999999999999999,
    });
    // redirect to the home page
    res.redirect("/");
  } else {
    res.redirect(`/signup/err/${fullName}/${userName}`);
  }
};

const login_login_post = async (req, res) => {
  const { userName, password } = req.body;
  // get the account and check if user name is true
  const account = await Accounts.findOne({ userName });
  if (account) {
    // check if password is true
    const validPass = await bcrypt.compare(password, account.password);
    if (validPass == true) {
      // save data into cookies
      res.cookie("userData", account, {
        secure: true,
        maxAge: 999999999999999,
      });
      res.redirect("/");
    } else {
      res.redirect(`/login/err/${userName}/`);
    }
  } else {
    res.redirect(`/login/err/${userName}/`);
  }
};
const loginErr_login_get = (req, res) => {
  const { userName } = req.params;

  res.render("login", {
    err: true,
    userName,
  });
};
const signUpErr_login_get = (req, res) => {
  const { userName, fullName } = req.params;

  res.render("signUp", {
    err: true,
    userName,
    fullName,
  });
};
const logout_login_get = (req, res) => {
  res.clearCookie("userData");
  res.redirect("/");
};

module.exports = {
  login_login_get,
  signUp_signUp_get,
  signUp_signUp_post,
  login_login_post,
  loginErr_login_get,
  signUpErr_login_get,
  logout_login_get,
};
