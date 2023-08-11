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
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-z ]+$/i,
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-z ]+$/i,
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-z ]+$/i,
        },
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: true,
        },
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: true,
        },
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          is: /^[a-z ]+$/i,
          len: [1, 50],
        },
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: true,
          checkValue(val) {
            if (val <= 0) {
              throw new Error("Must be a number greater than zero");
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
