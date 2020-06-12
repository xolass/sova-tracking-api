import models from '../../models';
import { defaultError, defaultSuccess } from '../../helpers/ResponseMessages';


export const getLocation = async (id, transaction) => {
  try {
    try {
      const location = await models.Devices.findOne({
        include: [{
          limit: 1,
          required: true,
          model: models.Locations,
          attributes: ['id', 'deviceId', 'createdAt', 'coordinates'],
          order: [['createdAt', 'DESC']],

        }],
        attributes: ['id', 'deviceMac'],
        where: {
          id,
        },
        transaction,
      });


      return location;
    } catch (err) {
      console.log(err);
      throw new Error('5007');
    }
  } catch ({ message }) {
    throw new Error(message);
  }
};

export const getAllDevicesLocation = async (transaction) => {
  try {
    try {
      const location = await models.Devices.findAll({
        include: [{
          attributes: ['id', 'deviceId', 'createdAt', 'coordinates'],
          model: models.Locations,
          limit: 1,
          order: [['createdAt', 'DESC']],
        }],
        attributes: ['id', 'deviceMac'],
        transaction,
      });


      return location;
    } catch (err) {
      throw new Error('5002');
    }
  } catch ({ message }) {
    throw new Error(message);
  }
};


export const getLastLocationRoute = async (req, res) => {
  const { id } = req.params;
  const transaction = await models.sequelize.transaction();

  try {
    if (id) {
      const location = await getLocation(id, transaction);
      await transaction.commit();

      return defaultSuccess(res, location);
    }

    const locations = await getAllDevicesLocation(transaction);
    await transaction.commit();

    return defaultSuccess(res, locations);
  } catch ({ message }) {
    await transaction.rollback();

    return defaultError(res, message);
  }
};
