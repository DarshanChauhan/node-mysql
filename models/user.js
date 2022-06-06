const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "userdetails",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      emailVerified: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    },
    { underscored: true }
  );
  return User;
};
