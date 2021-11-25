"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      dateStart: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dateEnd: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      photo: {
        type: Sequelize.ARRAY(Sequelize.STRING(500)),
        defaultValue: [
          "https://global-uploads.webflow.com/5c098da588bb06e551e5c0c4/5ca21aecb9de9c2b1fb90281_activedog-2.jpg",
          "https://getyourpet.com/wp-content/uploads/2019/02/AdobeStock_122086342-min.jpeg",
          "https://cff2.earth.com/uploads/2020/08/21170611/shutterstock_759950959-scaled.jpg",
        ],
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Categories" },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      latitude: {
        type: Sequelize.DECIMAL(8, 6),
      },
      longitude: {
        type: Sequelize.DECIMAL(9, 6),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Events");
  },
};
