
module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define('Locations', {
    coordinates: DataTypes.GEOMETRY('POINT', 4326),
    deviceId: DataTypes.INTEGER,
  }, { paranoid: false });
  Locations.associate = (models) => {
    Locations.belongsTo(models.Devices, {
      sourceKey: 'deviceId',
      foreignKey: 'id',
    });
  };
  return Locations;
};
