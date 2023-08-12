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
          min: {
            args: 1
            msg:"Value must be 1 or "
          }
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
