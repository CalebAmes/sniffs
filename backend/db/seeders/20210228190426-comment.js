"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", [
      {
        userId: 8,
        content: "I like doggos",
        eventId: 8,
      },
      {
        userId: 2,
        content: faker.random.words(10),
        eventId: 8,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 1,
      },
      {
        userId: 4,
        content: faker.random.words(10),
        eventId: 1,
      },
      {
        userId: 5,
        content: faker.random.words(10),
        eventId: 1,
      },
      {
        userId: 1,
        content: faker.random.words(10),
        eventId: 1,
      },
      {
        userId: 2,
        content: faker.random.words(10),
        eventId: 1,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 1,
      },
      {
        userId: 4,
        content: faker.random.words(10),
        eventId: 1,
      },
      {
        userId: 5,
        content: faker.random.words(10),
        eventId: 1,
      },
      {
        userId: 6,
        content: faker.random.words(10),
        eventId: 1,
      },
      {
        userId: 7,
        content: faker.random.words(10),
        eventId: 1,
      },
      {
        userId: 9,
        content: faker.random.words(10),
        eventId: 2,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 2,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 2,
      },
      {
        userId: 5,
        content: faker.random.words(10),
        eventId: 2,
      },
      {
        userId: 6,
        content: faker.random.words(10),
        eventId: 2,
      },
      {
        userId: 2,
        content: faker.random.words(10),
        eventId: 2,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 2,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 2,
      },
      {
        userId: 10,
        content: faker.random.words(10),
        eventId: 2,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 2,
      },
      {
        userId: 6,
        content: faker.random.words(10),
        eventId: 2,
      },
      {
        userId: 7,
        content: faker.random.words(10),
        eventId: 3,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 3,
      },
      {
        userId: 9,
        content: faker.random.words(10),
        eventId: 3,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 3,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 3,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 3,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 3,
      },
      {
        userId: 2,
        content: faker.random.words(10),
        eventId: 3,
      },
      {
        userId: 4,
        content: faker.random.words(10),
        eventId: 3,
      },
      {
        userId: 2,
        content: faker.random.words(10),
        eventId: 3,
      },
      {
        userId: 2,
        content: faker.random.words(10),
        eventId: 4,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 4,
      },
      {
        userId: 1,
        content: faker.random.words(10),
        eventId: 4,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 4,
      },
      {
        userId: 7,
        content: faker.random.words(10),
        eventId: 4,
      },
      {
        userId: 9,
        content: faker.random.words(10),
        eventId: 4,
      },
      {
        userId: 7,
        content: faker.random.words(10),
        eventId: 4,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 4,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 4,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 4,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 4,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 5,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 5,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 5,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 5,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 5,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 5,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 5,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 5,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 5,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 5,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 5,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 6,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 6,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 6,
      },
      {
        userId: 6,
        content: faker.random.words(10),
        eventId: 6,
      },
      {
        userId: 2,
        content: faker.random.words(10),
        eventId: 6,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 6,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 6,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 6,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 6,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 6,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 7,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 7,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 7,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 7,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 7,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 7,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 7,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 7,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 7,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 7,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 7,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 7,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 8,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 8,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 8,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 8,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 8,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 8,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 8,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 8,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 8,
      },
      {
        userId: 3,
        content: faker.random.words(10),
        eventId: 8,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", {});
  },
};
