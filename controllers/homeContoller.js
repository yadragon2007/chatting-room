const Accounts = require("../models/accountModel");

const homePage_index_get = async (req, res) => {
  const { userData } = req.cookies;

  if (userData) {
    const account = await Accounts.findById(userData._id);
    res.cookie("userData", account);
    res.render("index", {
      userData:account,
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  homePage_index_get,
};
