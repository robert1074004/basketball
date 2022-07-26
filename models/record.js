'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    PTS: DataTypes.INTEGER,
    FGA: DataTypes.INTEGER,
    FTA: DataTypes.INTEGER,
    FGM: DataTypes.INTEGER,
    THREE_PM: DataTypes.INTEGER,
    TOV: DataTypes.INTEGER,
    efg: DataTypes.FLOAT,
    ts: DataTypes.FLOAT,
    to_v: DataTypes.FLOAT,
    date: DataTypes.DATE
  }, {});
  Record.associate = function(models) {
    Record.belongsTo(models.User)
  };
  return Record;
};