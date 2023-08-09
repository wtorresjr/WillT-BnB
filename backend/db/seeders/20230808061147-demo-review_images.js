"use strict";

const { Op } = require("sequelize");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const seedReviewImages = [
  {
    url: "http://reviewImage1.jpg",
    reviewId: 1,
    preview: true,
  },
  {
    url: "http://reviewImage2.jpg",
    reviewId: 2,
    preview: true,
  },
  {
    url: "http://reviewImage3.jpg",
    reviewId: 3,
    preview: true,
  },
  {
    url: "http://reviewImage4.jpg",
    reviewId: 1,
    preview: false,
  },
  {
    url: "http://reviewImage5.jpg",
    reviewId: 2,
    preview: false,
  },
  {
    url: "http://reviewImage6.jpg",
    reviewId: 3,
    preview: false,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Review_Images";
    return await queryInterface.bulkInsert(options, seedReviewImages, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Review_Images";
    return await queryInterface.bulkDelete(
      options,
      {
        reviewId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
