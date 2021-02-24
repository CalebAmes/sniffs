'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' },
      },
      bio: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      breed: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      profilePicture: {
        type: Sequelize.STRING(100)
      },
      latitude: {
        type: Sequelize.DECIMAL(8,6)
      },
      longitude: {
        type: Sequelize.DECIMAL(9,6)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Profiles');
  }
};