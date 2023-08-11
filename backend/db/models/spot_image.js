"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      preview: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Spot_Image",
      // defaultScope: {
      //   attributes: {
      //     exclude: ["createdAt", "updatedAt", "id", "spotId", "preview"],
      //   },
      // },
    }
  );
  return Spot_Image;
};
