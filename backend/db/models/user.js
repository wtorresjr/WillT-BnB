"use strict";
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Review, {
        foreignKey: "userId",
      });
      User.hasMany(models.Booking, {
        foreignKey: "userId",
      });
      User.hasMany(models.Spot, {
        foreignKey: "ownerId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email");
            }
          },
          async checkIfUnique(userName) {
            const existingUsers = await User.findOne({
              where: { username: userName },
            });
            if (existingUsers) {
              throw new Error("User with that username already exists");
            }
          },
          notEmpty: {
            args: true,
            msg: "Username Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // unique: { args: true, msg: "User with that email already exists" },
          len: [3, 256],
          isEmail: {
            args: true,
            msg: "Invalid email",
          },
          async checkIfUnique(emailAddy) {
            const existingUsers = await User.findOne({
              where: { email: emailAddy },
            });
            if (existingUsers) {
              // msg: "User with that email already exists";
              throw new Error("User with that email already exists");
            }
          },
          notEmpty: {
            args: true,
            msg: "Email is required",
          },
        },
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [60, 60],
          notEmpty: {
            args: true,
            msg: "Password is required",
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notEmpty: {
            args: true,
            msg: "First Name is required",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notEmpty: {
            args: true,
            msg: "Last Name is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
    }
  );
  return User;
};
