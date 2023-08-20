"use strict";
const { Model } = require("sequelize");

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
        as: "ReviewImages",
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
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          len: {
            args: [5, 500],
            msg:"Review must be between 5 and 500 characters long."
          },
          notEmpty: {
            args: true,
            msg: "Review text is required",
          },
          notNull: {
            args: true,
            msg: "Review text is required",
          },
        },
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          starsRange(value) {
            if (!Number.isInteger(value) || value < 1 || value > 5) {
              throw new Error("Stars must be an integer from 1 to 5");
            }
          },
          notNull: {
            args: true,
            msg: "Stars must be an integer from 1 to 5",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
