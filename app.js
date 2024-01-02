const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

/* ------------------------------- realtime  -------------------------*/
const socketManager = require("./controllers/socket.io.Controller");

socketManager(io)

/* ------------------------------- Env -------------------------*/
const { database } = require("./config/env");
/* ------------------------------- view engine -------------------------*/
const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
/* ------------------------------- static files -------------------------*/
app.use(express.static(path.join(__dirname, "public")));

/* ------------------------------- Handling Middleware -------------------------*/

// cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// handle json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express session
const session = require("express-session");
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

/* ------------------------------- Data Base -------------------------*/
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${database.userName}:${database.password}@cluster0.agrhijx.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    const port = database.port || 8080;
    server.listen(port, () => {
      console.log(`http://127.0.0.1:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

/* ------------------------------- google login -------------------------*/

const passport = require("passport");
require("./config/passportGoogle");

app.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/login/google/callBack",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    const userData = req.user;
    // add cookies
    res.cookie("userData", userData, {
      maxAge: 999999999999999,
    });
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

/* ------------------------------- router -------------------------*/

// home
const home = require("./routes/home");
app.use(home);
// account
const account = require("./routes/account");
app.use(account);
// chat room
const chattingRoom = require("./routes/chattingRoom");
app.use(chattingRoom);

// 404
app.use((req, res) => {
  res.status(404).send("not found");
});
