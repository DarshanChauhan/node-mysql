const {Sequelize, DataTypes} = require('sequelize');

// DB Connection

const sequelize = new Sequelize('nodemail', 'root', '', {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
  pool: {max: 5, min: 0, idle: 10000},
});
sequelize
    .authenticate()
    .then(() => {
      console.log('connected to DB successfully ✅');
    })
    .catch((error) => {
      console.log(error);
    });

// table schema Declaration

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, DataTypes);

db.sequelize.sync({alter: true}).then(() => {
  console.log('Drop and re-aync db');
});

module.exports = db;
