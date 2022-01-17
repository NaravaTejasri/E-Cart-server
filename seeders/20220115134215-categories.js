"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          title: "HATS",
          subtitle: "SHOW NOW",
          imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "SNEAKERS",
          subtitle: "SHOW NOW",
          imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "JACKETS",
          subtitle: "SHOW NOW",
          imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "WOMENS",
          subtitle: "SHOW NOW",
          imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "MENS",
          subtitle: "SHOW NOW",
          imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
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
