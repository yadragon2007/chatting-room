const express = require("express");
const app = express();


// dotenv
const { database } = require("./config/env");
// html pages
const ejs = require('ejs');
app.set("view engine", "ejs");
// static files
app.use(express.static("public"));
// cookies
const cookieParser = require("cookie-parser")
app.use(cookieParser());
// handle json format
app.use(express.json())







// data base
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${database.userName}:${database.password}@cluster0.agrhijx.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    const port = database.port || 8080;
    app.listen(port, () => {
      console.log(`http://127.0.0.1:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });



// router
const home = require("./routes/home");
app.use(home)




// 404
app.use((req, res) => {
  res.status(404).send('not found')
});

