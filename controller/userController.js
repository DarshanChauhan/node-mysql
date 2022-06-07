const db = require("../models");
const User = db.user;
var nodemailer = require("nodemailer");
const { encrypt, decrypt } = require("../encryption/crypto");

// email sent
var encrptId;
function sendEmail(email, id) {
  encrptId = encrypt(`${id}`);
  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noreplyproexelancers123@gmail.com",
      pass: "rhndojhbjcnuvzis",
    },
  });
  console.log(encrptId.iv);
  var mailOptions = {
    from: "noreplyproexelancers123@gmail.com",
    to: email,
    subject: "Darshan Chauhan",
    html: `<a href='http://localhost:4000/user/verify-email/${encrptId.iv}'> Click Here And verify  Please 😀</a>`,
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
    console.log(await User.getAllUser());
    const { username, email, password, emailVerified } = req.body;
    user = await User.create({
      username: username,
      email: email,
      password: password,
      emailVerified: emailVerified,
    });
    if (user) {
      sendEmail(req.body.email, user.id);
      res.json({ message: "Email sent" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while add Data ",
    });
  }
};

const verifyEmail = async (req, res) => {
  let respoonse = await decrypt(encrptId);
  console.log(respoonse);
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

module.exports = {
  insertUser,
  verifyEmail,
};
