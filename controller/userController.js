const db = require("../models");
const User = db.user;
var nodemailer = require("nodemailer");

const getAllUser = async (req, res) => {
  let user;
  try {
    user = await User.findAll({});
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Brands.",
    });
  }
};
// email sent
function sendEmail() {
  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nodemailer7866@gmail.com",
      pass: "fzukiufzydrpvzyl",
    },
  });
  var mailOptions = {
    from: "nodemailer7866@gmail.com",
    to: "jeet.pubg123456@gmail.com",
    subject: "Darshan Chauhan",
    text: "That was easy!",
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
    const { username, email, password, emailVerified } = req.body;
    user = await User.create({
      username: username,
      email: email,
      password: password,
      emailVerified: emailVerified,
    }).then(function (user) {
      if (user) {
      } else {
        res.status(400).send("Error in insert new mail ");
      }
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while adding cart",
    });
  }
  res.json({ message: "Email sent" });
  sendEmail();
};
module.exports = {
  getAllUser,
  insertUser,
};
