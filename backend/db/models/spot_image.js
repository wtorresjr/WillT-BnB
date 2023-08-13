"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot_Image extends Model {
    static associate(models) {
      Spot_Image.belongsTo(models.Spot, {
        foreignKey: "spotId",
      });
    }
  }
  Spot_Image.init(
    {
      url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Url must be provided",
          },
        },
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      preview: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            args: true,
            msg: "Preview cannot be empty",
          },
          is: {
            args: /^(?:true|false)$/gim,
            msg: "Value must be true or false",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Spot_Image",
    }
  );
  return Spot_Image;
};
