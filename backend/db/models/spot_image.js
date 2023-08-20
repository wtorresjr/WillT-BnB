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
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Url must be provided",
          },
          notNull: {
            args: true,
            msg: "Url must be provided",
          },
          isUrl: {
            args: true,
            msg: "Valid url is required",
          },
        },
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      preview: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Preview cannot be empty",
          },
          notNull: {
            args: true,
            msg: "Preview value must be provided",
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
