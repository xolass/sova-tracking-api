import models from '../../models';
import { defaultSuccess, defaultError } from '../../helpers/ResponseMessages';

export const addNewDevice = async (mac, transaction) => {
  try {
    try {
      const newDevice = await models.Devices.create({
        deviceMac: mac,
      }, {
        transaction,
      });
      return newDevice;
    } catch (err) {
      throw new Error('5001');
    }
  } catch ({ message }) {
    throw new Error(message);
  }
};

export const addNewDeviceRoute = async (req, res) => {
  const { mac } = req.body;
  const transaction = await models.sequelize.transaction();

  try {
    const location = await addNewDevice(mac, transaction);
    await transaction.commit();

    return defaultSuccess(res, location);
  } catch ({ message }) {
    await transaction.rollback();

    return defaultError(res, message);
  }
};
