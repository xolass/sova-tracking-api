
module.exports = (sequelize, DataTypes) => {
  const Devices = sequelize.define('Devices', {
    deviceMac: DataTypes.STRING,
  }, { paranoid: false });
  Devices.associate = (models) => {
    Devices.hasMany(models.Locations, {
      sourceKey: 'id',
      foreignKey: 'deviceId',
    });
  };
  return Devices;
};
