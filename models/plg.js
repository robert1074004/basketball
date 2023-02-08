'use strict';
module.exports = (sequelize, DataTypes) => {
  const PLG = sequelize.define('PLG', {
    team: DataTypes.STRING,
    name: DataTypes.STRING,
    PTS: DataTypes.FLOAT,
    FGA: DataTypes.FLOAT,
    FTA: DataTypes.FLOAT,
    FGM: DataTypes.FLOAT,
    THREE_PM: DataTypes.FLOAT,
    TOV: DataTypes.FLOAT,
    EFG: DataTypes.INTEGER,
    TS: DataTypes.INTEGER,
    TO_V: DataTypes.INTEGER,
    game:DataTypes.INTEGER
  }, {});
  PLG.associate = function() {
    // associations can be defined here
  };
  return PLG;
};