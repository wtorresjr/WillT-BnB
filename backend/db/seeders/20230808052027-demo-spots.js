"use strict";

const { Op } = require("sequelize");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const seedSpots = [
  {
    ownerId: 1,
    address: "123 Fake Street",
    city: "Fake Town",
    country: "United States",
    lat: 23.56,
    lng: 45.66,
    name: "Big Rock Cabin",
    description:
      "A beautiful Log Cabin Home  On riverfront.  Kayaks, Biking and hiking trails in a remote, peaceful location.",
    price: 125.0,
  },
  {
    ownerId: 2,
    address: "555 Phony Avenue",
    city: "Phony City",
    country: "United States",
    lat: 53.66,
    lng: 75.54,
    name: "Cozy Apartment",
    description:
      "With stunning sea views of the Biscayne Bay, this unique condo of 1,347 sq will captivate you. Two Bedrooms and 2 bathrooms, open living space with floor-to-ceiling windows and kitchen completely equipped.",
    price: 275.0,
  },
  {
    ownerId: 3,
    address: "9999 Not Real Drive",
    city: "Madeupton",
    country: "United States",
    lat: 100.44,
    lng: 48.98,
    name: "Private Island Spot",
    description:
      "You own private island right off the City of Marathon in the Florida Keys. 3 bedrooms, two baths, 12 ft veranda that surrounds the house and it even comes with a 21 ft. Carolina Skiff for transportation to and from the island.",
    price: 1585.0,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return await queryInterface.bulkInsert(options, seedSpots, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return await queryInterface.bulkDelete(
      options,
      {
        ownerId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
