"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review_Image.belongsTo(models.Review, {
        foreignKey: "id",
      });
    }
  }
  Review_Image.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "URL must be provided",
          },
          isUrl: {
            args: true,
            msg: "Must be a valid Url format",
          },
        },
      },
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      preview: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          is: {
            args: /^(?:true|false)$/gim,
            msg: "Value must be true or false",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Review_Image",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Review_Image;
};
