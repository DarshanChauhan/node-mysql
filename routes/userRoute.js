const express = require("express");
const route = express.Router();

const {
  getAllUser,
  insertUser,
  verifyEmail,
} = require("../controller/userController");

// post API
route.post("/sign-up", insertUser);

// get API
route.get("/verify-email/:id", verifyEmail);

module.exports = route;
