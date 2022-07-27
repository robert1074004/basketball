'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    position: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
    image: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Record)
  };
  return User;
};