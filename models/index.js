const { Sequelize, Datatypes } = require("sequelize");

// DB Connection

const sequelize = new Sequelize("nodemail", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  pool: { max: 5, min: 0, idle: 10000 },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("connected to DB successfully ✅");
  })
  .catch((error) => {
    console.log(error);
  });

// table schema Declaration

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync().then(() => {
  console.log("Drop and re-aync db");
});

module.exports = db;
