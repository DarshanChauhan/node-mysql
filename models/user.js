const { Sequelize, Op } = require("sequelize");

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
      email: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email-id required",
          },
          isEmail: {
            args: true,
            msg: "Valid email-id required",
          },
        },
        unique: { msg: "Email address already in use!" },
      },
      password: { type: Sequelize.STRING },
      emailVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    },
    { underscored: true }
  );
  return User;
};
