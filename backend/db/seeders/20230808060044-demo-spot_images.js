"use strict";

const { Op } = require("sequelize");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const seedSpotImages = [
  {
    url: "http://spotImage1.jpg",
    spotId: 1,
    preview: true,
  },
  {
    url: "http://spotImage2.jpg",
    spotId: 2,
    preview: true,
  },
  {
    url: "http://spotImage3.jpg",
    spotId: 3,
    preview: true,
  },
  {
    url: "http://spotImage4.jpg",
    spotId: 1,
    preview: false,
  },
  {
    url: "http://spotImage5.jpg",
    spotId: 2,
    preview: false,
  },
  {
    url: "http://spotImage6.jpg",
    spotId: 3,
    preview: false,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spot_Images";
    return await queryInterface.bulkInsert(options, seedSpotImages, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spot_Images";
    return await queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
