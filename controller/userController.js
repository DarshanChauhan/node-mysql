const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
var nodemailer = require("nodemailer");
const { encrypt, decrypt } = require("../encryption/crypto");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const dotenv = require("dotenv");
dotenv.config();

// email sent
function sendEmail(email, id, username) {
  var encrptId = encrypt(`${id}`);
  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.YOUR_EMAIL_ADDRESS,
      pass: process.env.YOUR_EMAIL_PASSWORD,
    },
  });
  // console.log(encrptId.iv);
  var mailOptions = {
    from: process.env.YOUR_EMAIL_ADDRESS,
    to: email,
    subject: "Darshan Chauhan",
    html: `<h1>Email Confirmation</h1>
    <h2>Hello ${username}</h2>
    <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
    <a href='http://localhost:4000/user/verify-email/${encrptId.encryptedData}'> मुझे टच करो  😀</a>`,
  };
  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
const insertUser = async (req, res) => {
  let user;
  try {
    // console.log(await User.getAllUser());
    const { username, email, password, emailVerified } = req.body;
    let hashPassword = bcrypt.hashSync(password, saltRounds);

    user = await User.create({
      username: username,
      email: email,
      password: hashPassword,
      emailVerified: emailVerified,
    });
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 86400,
      });
      sendEmail(req.body.email, user.id, user.username);
      res.json({
        message:
          "'Thanks for registering✅ Please confirm your email! 📩 We have sent a link!'",
        token: token,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while add Data ",
    });
  }
};

// email verify

const verifyEmail = async (req, res) => {
  let respoonse = await decrypt(req.params.encrptId);
  console.log("*****************************");

  console.log(respoonse);

  console.log("*****************************");

  const findUser = await User.findOne({ where: { id: respoonse } });

  if (findUser) {
    User.update(
      {
        emailVerified: true,
      },
      {
        where: { id: respoonse },
      }
    );
    res.json({ message: "success" });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
};

// log in
const userLogin = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ where: { email: body.email } });
  if (user) {
    const validPassword = await bcrypt.compare(body.password, user.password);

    if (!user.emailVerified) {
      res.status(422).json({ error: " Email not verify " });
    } else if (validPassword) {
      res.status(200).json({ message: "Login SuccessFully" });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
};

const resendVerificationLink = async (req, res) => {
  const email = req.body.email;
  const findIdByEmail = await User.findOne({ where: { email: email } });
  sendEmail(findIdByEmail.email, findIdByEmail.id, findIdByEmail.username);
  res.json({
    message: "successFully resend link please check your Email Inbox",
  });
};

module.exports = {
  insertUser,
  verifyEmail,
  userLogin,
  resendVerificationLink,
};
