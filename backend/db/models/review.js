"use strict";
const { Model } = require("sequelize");

const { Spot, User } = require("../models");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.Review_Image, {
        foreignKey: "reviewId",
      });
      Review.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Review.belongsTo(models.Spot, {
        foreignKey: "spotId",
      });
    }
  }
  Review.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Review text is required",
          },
        },
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          is: {
            args: /[1-5]/,
            msg: "Stars must be an integer from 1 to 5",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
      defaultScope: {
        attributes: {
          exclude: [],
        },
      },
    }
  );
  return Review;
};
