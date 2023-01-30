'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users','PTS',{type: Sequelize.INTEGER})
    await queryInterface.removeColumn('users','PTS')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users','PTS',{type: Sequelize.INTEGER})
    await queryInterface.removeColumn('users','PTS')
  }
};
