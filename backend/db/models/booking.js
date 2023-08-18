"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Spot, {
        foreignKey: "spotId",
      });
      Booking.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Booking.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          checkDate(startDay) {
            const getDate = new Date().toJSON().split("T");
            todaysDate = getDate[0];
            if (startDay < todaysDate) {
              throw new Error("startDate cannot be before todays date");
            }
          },
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          checkDate(endDay) {
            if (endDay <= this.startDate) {
              throw new Error("endDate cannot be on or before startDate");
            }
          },
          checkMore(endDay) {
            const getDate = new Date().toJSON().split("T");
            todaysDate = getDate[0];
            if (endDay <= todaysDate) {
              throw new Error("endDate cannot be on or before todays date");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Booking",
      // defaultScope: {
      //   attributes: {
      //     exclude: ["createdAt", "updatedAt"],
      //   },
      // },
    }
  );
  return Booking;
};
