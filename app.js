const express = require('express');
const app = express()

// html pages
app.set("view engine", "ejs");
// static files
app.use(express.static("public"));
