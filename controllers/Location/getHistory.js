import models from '../../models';
import { defaultError, defaultSuccess } from '../../helpers/ResponseMessages';


export const getAllDevicesLocationHistory = async (transaction) => {
  try {
    try {
      const location = await models.Devices.findAll({
        include: [{
          attributes: ['coordinates', 'deviceId', 'createdAt'],
          model: models.Locations,
        }],
        attributes: ['id', 'deviceMac'],
        order: [['createdAt', 'DESC']],
        transaction,
      });

      return location;
    } catch (err) {
      console.log(err);
      throw new Error('5006');
    }
  } catch ({ message }) {
    throw new Error(message);
  }
};

export const getDeviceLocationHistory = async (id, transaction) => {
  try {
    try {
      const location = await models.Devices.findOne({
        include: [{
          attributes: ['deviceId', 'coordinates', 'createdAt'],
          model: models.Locations,
        }],
        attributes: ['id', 'deviceMac'],
        order: [['createdAt', 'DESC']],
        where: {
          id,
        },
        transaction,
      });


      return location;
    } catch (err) {
      throw new Error('5005');
    }
  } catch ({ message }) {
    throw new Error(message);
  }
};


export const getLocationHistoryRoute = async (req, res) => {
  const { id } = req.params;
  const transaction = await models.sequelize.transaction();

  try {
    if (id) {
      const locationHistory = await getDeviceLocationHistory(id, transaction);
      await transaction.commit();

      return defaultSuccess(res, locationHistory);
    }
    const locationsHistory = await getAllDevicesLocationHistory(transaction);
    await transaction.commit();
    return defaultSuccess(res, locationsHistory);
  } catch ({ message }) {
    await transaction.rollback();

    return defaultError(res, message);
  }
};
