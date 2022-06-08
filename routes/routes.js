const express = require('express');
const route = new express.Router();

// Parent API

route.use('/user', require('./userRoute'));

module.exports = route;
