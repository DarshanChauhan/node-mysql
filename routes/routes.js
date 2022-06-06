const express = require("express");
const route = express.Router();

// Parent API

route.use("/user", require("./userRoute"));

module.exports = route;
