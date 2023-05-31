'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users','PTS',{type: Sequelize.INTEGER})
    await queryInterface.removeColumn('Users','PTS')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users','PTS',{type: Sequelize.INTEGER})
    await queryInterface.removeColumn('Users','PTS')
  }
};
