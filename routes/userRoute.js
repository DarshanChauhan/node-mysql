const express = require("express");
const route = express.Router();

const { getAllUser, insertUser } = require("../controller/userController");
// const { sendEmail } = require("../mail/sendmail");

// post API
route.post("/sign-up", insertUser);

module.exports = route;
