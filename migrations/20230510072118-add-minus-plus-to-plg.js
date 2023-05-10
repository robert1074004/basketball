'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('PLGs', 'total_minus_plus', { type: Sequelize.INTEGER })
  },

  down: async (queryInterface) => {
   await queryInterface.removeColumn('PLGs', 'total_minus_plus')
  }
};
