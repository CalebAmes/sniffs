'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RSVPs', [
      {
        userId: 1,
        eventId: 1,
      },
      {
        userId: 2,
        eventId: 1,
      },
      {
        userId: 3,
        eventId: 1,
      },
      {
        userId: 4,
        eventId: 1,
      },
      {
        userId: 5,
        eventId: 1,
      },
      {
        userId: 6,
        eventId: 1,
      },
      {
        userId: 7,
        eventId: 1,
      },
      {
        userId: 8,
        eventId: 1,
      },
      {
        userId: 9,
        eventId: 1,
      },
      {
        userId: 10,
        eventId: 1,
      },
      {
        userId: 1,
        eventId: 2,
      },
      {
        userId: 2,
        eventId: 2,
      },
      {
        userId: 3,
        eventId: 2,
      },
      {
        userId: 4,
        eventId: 2,
      },
      {
        userId: 5,
        eventId: 2,
      },
      {
        userId: 6,
        eventId: 2,
      },
      {
        userId: 7,
        eventId: 2,
      },
      {
        userId: 8,
        eventId: 2,
      },
      {
        userId: 9,
        eventId: 2,
      },
      {
        userId: 10,
        eventId: 2,
      },
      {
        userId: 1,
        eventId: 3,
      },
      {
        userId: 2,
        eventId: 3,
      },
      {
        userId: 3,
        eventId: 3,
      },
      {
        userId: 4,
        eventId: 3,
      },
      {
        userId: 5,
        eventId: 3,
      },
      {
        userId: 6,
        eventId: 3,
      },
      {
        userId: 7,
        eventId: 3,
      },
      {
        userId: 8,
        eventId: 3,
      },
      {
        userId: 9,
        eventId: 3,
      },
      {
        userId: 10,
        eventId: 3,
      },
      {
        userId: 1,
        eventId: 4,
      },
      {
        userId: 2,
        eventId: 4,
      },
      {
        userId: 3,
        eventId: 4,
      },
      {
        userId: 4,
        eventId: 4,
      },
      {
        userId: 5,
        eventId: 4,
      },
      {
        userId: 6,
        eventId: 4,
      },
      {
        userId: 7,
        eventId: 4,
      },
      {
        userId: 8,
        eventId: 4,
      },
      {
        userId: 9,
        eventId: 4,
      },
      {
        userId: 10,
        eventId: 4,
      },
      {
        userId: 1,
        eventId: 5,
      },
      {
        userId: 2,
        eventId: 5,
      },
      {
        userId: 3,
        eventId: 5,
      },
      {
        userId: 4,
        eventId: 5,
      },
      {
        userId: 5,
        eventId: 5,
      },
      {
        userId: 6,
        eventId: 5,
      },
      {
        userId: 7,
        eventId: 5,
      },
      {
        userId: 8,
        eventId: 5,
      },
      {
        userId: 9,
        eventId: 5,
      },
      {
        userId: 10,
        eventId: 5,
      },
      {
        userId: 1,
        eventId: 7,
      },
      {
        userId: 2,
        eventId: 7,
      },
      {
        userId: 3,
        eventId: 7,
      },
      {
        userId: 4,
        eventId: 7,
      },
      {
        userId: 5,
        eventId: 7,
      },
      {
        userId: 6,
        eventId: 7,
      },
      {
        userId: 7,
        eventId: 7,
      },
      {
        userId: 8,
        eventId: 7,
      },
      {
        userId: 9,
        eventId: 7,
      },
      {
        userId: 10,
        eventId: 7,
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
