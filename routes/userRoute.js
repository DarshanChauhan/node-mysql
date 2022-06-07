const express = require("express");
const route = express.Router();

const {
  insertUser,
  verifyEmail,
  userLogin,
} = require("../controller/userController");

// post API
route.post("/sign-up", insertUser);

// get API
route.get("/verify-email/:encrptId", verifyEmail);

route.post("/login", userLogin);

module.exports = route;
