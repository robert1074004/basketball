'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PTS: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      FGA: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      FTA: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      FGM: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      THREE_PM: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      TOV: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      efg: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      ts: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      to_v: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Records');
  }
};