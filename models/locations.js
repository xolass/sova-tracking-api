
module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define('Locations', {
    coordinates: DataTypes.STRING,
    mac: DataTypes.STRING,
  }, {});
  Locations.associate = () => {
    // associations can be defined here
  };
  return Locations;
};
