"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "RedHat",
          description: "Nice Hat",
          price: 50,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BlackCap",
          description: "Nice Hat",
          price: 50,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Adidas",
          description: "Nice shoes",
          price: 50,
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nike",
          description: "Nice shoes",
          price: 50,
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Slim shirt",
          description: "Nice shirt",
          price: 50,
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ck",
          description: "Nice t-shirt",
          price: 50,
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jacket",
          description: "Nice jacket",
          price: 50,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ck",
          description: "Nice t-shirt",
          price: 50,
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kurta",
          description: "Nice kurta",
          price: 50,
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
  },
};
