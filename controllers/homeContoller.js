const homePage_index_get = (req, res) => {
  const { userData } = res.cookie;

  if (userData) {
    res.redirect("/chatRoom")
  } else {
    res.redirect("/login")
  }
};

module.exports = {
  homePage_index_get,
};
