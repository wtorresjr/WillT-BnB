"use strict";

const { Op } = require("sequelize");

const { seedReviews } = require("./seederVars/seederVars");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

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
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      },
      {}
    );
  },
};
