'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Records','UserId',{type: Sequelize.INTEGER, allowNull: false, references: {model: 'Users', key: 'id'}})
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Records', 'UserId')
  }
};
