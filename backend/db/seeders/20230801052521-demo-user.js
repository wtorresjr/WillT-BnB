"use strict";

const { Op } = require("sequelize");

const { seedUsers } = require("./seederVars/seederVars");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return await queryInterface.bulkInsert(options, seedUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return await queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "User1",
            "User2",
            "User3",
            "User4",
            "User5",
            "User6",
            "User7",
            "User8",
            "User9",
            "User10",
          ],
        },
      },
      {}
    );
  },
};
