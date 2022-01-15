"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          title: "HATS",
          subtitle: "SHOW NOW",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "JACKETS",
          subtitle: "SHOW NOW",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "SNEAKERS",
          subtitle: "SHOW NOW",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "WOMENS",
          subtitle: "SHOW NOW",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "MENS",
          subtitle: "SHOW NOW",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
