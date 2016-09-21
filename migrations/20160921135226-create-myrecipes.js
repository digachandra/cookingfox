'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('myrecipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      judul: {
        type: Sequelize.STRING
      },
      direction: {
        type: Sequelize.TEXT
      },
      level: {
        type: Sequelize.STRING
      },
      timeprep: {
        type: Sequelize.INTEGER
      },
      timecook: {
        type: Sequelize.INTEGER
      },
      serving: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('myrecipes');
  }
};
