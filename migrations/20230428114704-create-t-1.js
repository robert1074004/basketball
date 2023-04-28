'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('T1s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      team: {
        type: Sequelize.STRING
      },
      game: {
        type: Sequelize.INTEGER
      },
      PTS: {
        type: Sequelize.FLOAT
      },
      FGM: {
        type: Sequelize.FLOAT
      },
      FGA: {
        type: Sequelize.FLOAT
      },
      THREE_PM: {
        type: Sequelize.FLOAT
      },
      FTA: {
        type: Sequelize.FLOAT
      },
      TOV: {
        type: Sequelize.FLOAT
      },
      TS: {
        type: Sequelize.INTEGER
      },
      EFG: {
        type: Sequelize.INTEGER
      },
      TO_V: {
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
  down: (queryInterface) => {
    return queryInterface.dropTable('T1s');
  }
};