'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PLGs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      team: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      game: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      PTS: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      FGA: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      FTA: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      FGM: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      THREE_PM: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      TOV: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      EFG: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      TS: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      TO_V: {
        allowNull: false,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PLGs');
  }
};