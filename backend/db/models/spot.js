"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Spot_Image, {
        foreignKey: "spotId",
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
      });
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
      });
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
      });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Street address is required",
          },
          notNull: {
            args: true,
            msg: "Street address is required",
          },
        },
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,

        validate: {
          is: {
            args: /^[a-z- ]+$/i,
            msg: "Only alphanumeric characters allowed",
          },
          notEmpty: { args: true, msg: "City is required" },
          notNull: {
            args: true,
            msg: "City is required",
          },
        },
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^[a-z ]+$/i,
            msg: "Only alphanumeric characters allowed",
          },
          notEmpty: { args: true, msg: "State is required" },
          notNull: {
            args: true,
            msg: "State is required",
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[a-z ]+$/i,
            msg: "Only alphanumeric characters allowed",
          },
          notEmpty: { args: true, msg: "Country is required" },
          notNull: {
            args: true,
            msg: "Country is required",
          },
        },
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
            args: true,
            msg: "Latitude is not valid",
          },
          notEmpty: {
            args: true,
            msg: "Latitude is not valid",
          },
          notNull: {
            args: true,
            msg: "Latitude is not valid",
          },
        },
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
            args: true,
            msg: "Longitude is not valid",
          },
          notEmpty: { args: true, msg: "Longitude is not valid" },
          notNull: {
            args: true,
            msg: "Longitude is not valid",
          },
        },
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          is: {
            args: /^[a-z ]+$/i,
            msg: "Only alphanumeric characters allowed",
          },
          len: {
            args: [1, 50],
            msg: "Name must be less than 50 characters",
          },
          notEmpty: { args: true, msg: "Name is required" },
          notNull: {
            args: true,
            msg: "Name is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Description is required",
          },
          notNull: {
            args: true,
            msg: "Description is required",
          },
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
            args: true,
            msg: "Only numeric values allowed",
          },
          notEmpty: {
            args: true,
            msg: "Price per day is required",
          },
          notNull: {
            args: true,
            msg: "Price per day is required",
          },
          checkValue(val) {
            if (val < 0) {
              throw new Error("Price must be greater than $0");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Spot",
      // defaultScope: {
      //   attributes: {
      //     exclude: [],
      //   },
      // },
    }
  );
  return Spot;
};
