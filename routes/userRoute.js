const express = require('express');
const route = new express.Router();

const {
  insertUser,
  verifyEmail,
  userLogin,
  resendVerificationLink,
} = require('../controller/userController');

// post API
route.post('/sign-up', insertUser);

// get API
route.get('/verify-email/:encrptId', verifyEmail);

route.post('/login', userLogin);

route.post('/re-send-emailverification', resendVerificationLink);

module.exports = route;
