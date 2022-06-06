const db = require("../models");
const User = db.user;
var nodemailer = require("nodemailer");
const { encrypt } = require("../encryption/crypto");

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
function sendEmail(email, id) {
  // const encrptId = encrypt("asd", id);
  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nodemailer7866@gmail.com",
      pass: "fzukiufzydrpvzyl",
    },
  });
  var mailOptions = {
    from: "nodemailer7866@gmail.com",
    to: email,
    subject: "Darshan Chauhan",
    html: `<a href='http://localhost:4000/user/verify-email/${id}'> Click Here And verify  Please :)</a>`,
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
    });
    if (user) {
      sendEmail(req.body.email, user.id);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while adding cart",
    });
  }
  res.json({ message: "Email sent" });
};

const verifyEmail = async (req, res) => {
  const findUser = await User.findOne({ where: { id: req.params.id } });
  console.log(findUser);
  if (findUser) {
    User.update(
      {
        emailVerified: true,
      },
      {
        where: { id: req.params.id },
      }
    );
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
  res.json({ message: "success" });
};

module.exports = {
  getAllUser,
  insertUser,
  verifyEmail,
};
