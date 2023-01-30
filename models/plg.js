'use strict';
module.exports = (sequelize, DataTypes) => {
  const PLG = sequelize.define('PLG', {
    team: DataTypes.STRING,
    name: DataTypes.STRING,
    PTS: DataTypes.INTEGER,
    FGA: DataTypes.INTEGER,
    FTA: DataTypes.INTEGER,
    FGM: DataTypes.INTEGER,
    THREE_PM: DataTypes.INTEGER,
    TOV: DataTypes.INTEGER,
    EFG: DataTypes.INTEGER,
    TS: DataTypes.INTEGER,
    TO_V: DataTypes.INTEGER,
    game:DataTypes.INTEGER
  }, {});
  PLG.associate = function(models) {
    // associations can be defined here
  };
  return PLG;
};