"use strict";

const { Op } = require("sequelize");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const seedBookings = [
  {
    userId: 3,
    spotId: 1,
    startDate: "2023-10-01",
    endDate: "2023-10-15",
  },
  {
    userId: 2,
    spotId: 3,
    startDate: "2023-08-15",
    endDate: "2023-08-25",
  },
  {
    userId: 1,
    spotId: 2,
    startDate: "2023-9-01",
    endDate: "2023-9-15",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return await queryInterface.bulkInsert(options, seedBookings, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return await queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
