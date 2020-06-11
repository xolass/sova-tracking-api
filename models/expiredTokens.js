
module.exports = (sequelize, DataTypes) => {
  const ExpiredTokens = sequelize.define('ExpiredTokens', {
    expiredToken: DataTypes.STRING,
  }, { paranoid: true });
  return ExpiredTokens;
};
