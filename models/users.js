
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
  }, { paranoid: true });
  return Users;
};
