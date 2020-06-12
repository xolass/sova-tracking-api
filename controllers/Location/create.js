import models from '../../models';
import { defaultSuccess, defaultError } from '../../helpers/ResponseMessages';
import { getDevice } from '../Devices/get';

export const insertNewLocation = async ({ xCord, yCord }, mac, transaction) => {
  const coordinates = { type: 'Point', coordinates: [xCord, yCord] };
  try {
    const device = await getDevice(mac, transaction);

    const { id: deviceId } = device.dataValues;
    try {
      const newLocation = await models.Locations.create({
        coordinates,
        deviceId,
      }, {
        transaction,
      });
      return newLocation;
    } catch (err) {
      throw new Error('5001');
    }
  } catch ({ message }) {
    throw new Error(message);
  }
};

export const insertNewLocationRoute = async (req, res) => {
  const { coordinates, mac, id } = req.body;
  const deviceIdentifier = mac || id;

  const transaction = await models.sequelize.transaction();

  try {
    const location = await insertNewLocation(coordinates, deviceIdentifier);
    await transaction.commit();

    return defaultSuccess(res, location);
  } catch ({ message }) {
    await transaction.rollback();

    return defaultError(res, message);
  }
};
