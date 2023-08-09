"use strict";

const { Op } = require("sequelize");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const seedReviews = [
  {
    userId: 3,
    spotId: 1,
    review: "Cool spot had a blast.",
    stars: 5,
  },
  {
    userId: 2,
    spotId: 3,
    review: "Dirty bathroom everything else ok.",
    stars: 3,
  },
  {
    userId: 1,
    spotId: 2,
    review: "Great views, huge TV",
    stars: 5,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return await queryInterface.bulkInsert(options, seedReviews, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return await queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
