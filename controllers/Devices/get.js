import models from '../../models';
import { defaultError, defaultSuccess } from '../../helpers/ResponseMessages';


export const getDevice = async (cod, transaction) => {
  try {
    const whereKey = typeof cod === 'number' ? 'id' : 'deviceMac';
    const devices = await models.Devices.findOne({
      where: {
        [whereKey]: cod,
      },
      transaction,
    });
    if (!devices) throw new Error('5003');

    return devices;
  } catch ({ message }) {
    throw new Error(message);
  }
};

export const getAllDevices = async (transaction) => {
  try {
    try {
      const location = await models.Devices.findAll({
        transaction,
      });

      return location;
    } catch (err) {
      throw new Error('5004');
    }
  } catch ({ message }) {
    throw new Error(message);
  }
};


export const getDeviceRoute = async (req, res) => {
  const { id } = req.params;
  const transaction = await models.sequelize.transaction();
  try {
    if (id) {
      const device = await getDevice(id, transaction);

      await transaction.commit();
      return defaultSuccess(res, device);
    }

    const devices = await getAllDevices(transaction);

    await transaction.commit();
    return defaultSuccess(res, devices);
  } catch ({ message }) {
    await transaction.rollback();
    return defaultError(res, message);
  }
};
