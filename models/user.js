'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    position: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
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
  User.associate = function(models) {
    User.hasMany(models.Record)
    User.belongsToMany(User, {
      through: models.Followship,
      foreignKey: 'followingId',
      as: 'Followers'
    })
    User.belongsToMany(User, {
      through: models.Followship,
      foreignKey: 'followerId',
      as: 'Followings'
    })
  };
  return User;
};