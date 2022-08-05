'use strict';
module.exports = (sequelize, DataTypes) => {
  const PLG = sequelize.define('PLG', {
    team: DataTypes.STRING,
    name: DataTypes.STRING,
    games: DataTypes.INTEGER,
    efg: DataTypes.FLOAT,
    ts: DataTypes.FLOAT,
    tov: DataTypes.FLOAT
  }, {});
  PLG.associate = function(models) {
    // associations can be defined here
  };
  return PLG;
};