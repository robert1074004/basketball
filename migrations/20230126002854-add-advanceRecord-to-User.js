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
      queryInterface.addColumn('Users', 'efg', {type: Sequelize.DataTypes.INTEGER,defaultValue:0}, {transaction: t}),
      queryInterface.addColumn('Users', 'ts', {type: Sequelize.DataTypes.INTEGER,defaultValue:0}, {transaction: t}),
      queryInterface.addColumn('Users', 'to_v', {type: Sequelize.DataTypes.INTEGER,defaultValue:0}, {transaction: t})])
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
      queryInterface.removeColumn('Users', 'efg', {transaction: t}),
      queryInterface.removeColumn('Users', 'ts',  {transaction: t}),
      queryInterface.removeColumn('Users', 'to_v', {transaction: t})])
    })
  }
};
