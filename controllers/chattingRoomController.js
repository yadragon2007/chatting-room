const publicChatRoom_index_get = (req, res) => {
  const { userData } = req.cookies;
  res.render("index", {
    title: "Public Chat Room",
    userData,
  });
};


module.exports = {
  publicChatRoom_index_get,
}