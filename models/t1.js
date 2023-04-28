'use strict';
module.exports = (sequelize, DataTypes) => {
  const T1 = sequelize.define('T1', {
    name: DataTypes.STRING,
    team: DataTypes.STRING,
    game: DataTypes.INTEGER,
    PTS: DataTypes.FLOAT,
    FGM: DataTypes.FLOAT,
    FGA: DataTypes.FLOAT,
    THREE_PM: DataTypes.FLOAT,
    FTA: DataTypes.FLOAT,
    TOV: DataTypes.FLOAT,
    TS: DataTypes.INTEGER,
    EFG: DataTypes.INTEGER,
    TO_V: DataTypes.INTEGER
  }, {});
  T1.associate = function() {
    // associations can be defined here
  };
  return T1;
};