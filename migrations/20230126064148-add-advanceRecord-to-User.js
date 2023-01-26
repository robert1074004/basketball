'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([queryInterface.addColumn('Users', 'PTS', {type: Sequelize.DataTypes.INTEGER,defaultValue:0}, {transaction: t}),
      queryInterface.addColumn('Users', 'FGA', {type: Sequelize.DataTypes.INTEGER,defaultValue:0}, {transaction: t}),
      queryInterface.addColumn('Users', 'FTA', {type: Sequelize.DataTypes.INTEGER,defaultValue:0}, {transaction: t}),
      queryInterface.addColumn('Users', 'FGM', {type: Sequelize.DataTypes.INTEGER,defaultValue:0}, {transaction: t}),
      queryInterface.addColumn('Users', 'THREE_PM', {type: Sequelize.DataTypes.INTEGER,defaultValue:0}, {transaction: t}),
      queryInterface.addColumn('Users', 'TOV', {type: Sequelize.DataTypes.INTEGER,defaultValue:0}, {transaction: t}),
      queryInterface.addColumn('Users', 'EFG', {type: Sequelize.DataTypes.INTEGER,defaultValue:0}, {transaction: t}),
      queryInterface.addColumn('Users', 'TS', {type: Sequelize.DataTypes.INTEGER,defaultValue:0}, {transaction: t}),
      queryInterface.addColumn('Users', 'TO_V', {type: Sequelize.DataTypes.INTEGER,defaultValue:0}, {transaction: t}),
      queryInterface.addColumn('Users', 'game', {type: Sequelize.DataTypes.INTEGER,defaultValue:0}, {transaction: t})])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([queryInterface.removeColumn('Users', 'PTS',  {transaction: t}),
      queryInterface.removeColumn('Users', 'FGA',  {transaction: t}),
      queryInterface.removeColumn('Users', 'FTA',  {transaction: t}),
      queryInterface.removeColumn('Users', 'FGM',  {transaction: t}),
      queryInterface.removeColumn('Users', 'THREE_PM',  {transaction: t}),
      queryInterface.removeColumn('Users', 'TOV', {transaction: t}),
      queryInterface.removeColumn('Users', 'EFG', {transaction: t}),
      queryInterface.removeColumn('Users', 'TS',  {transaction: t}),
      queryInterface.removeColumn('Users', 'TO_V', {transaction: t}),
      queryInterface.removeColumn('Users', 'game', {transaction: t})])
    })
  }
};
