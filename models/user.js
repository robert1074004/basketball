'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    position: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
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