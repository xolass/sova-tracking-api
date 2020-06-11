import models from '../../models';
import { defaultError, defaultSuccess } from '../../helpers/ResponseMessages';


const Logout = async ({ id }) => {
  const transaction = await models.sequelize.transaction();
  try {
    const user = await models.Users.findByPk(id, { transaction });
    if (!user) throw new Error('4002');

    const { token: expiredToken } = user;

    try {
      await models.ExpiredTokens.create({ expiredToken }, { transaction });
    } catch (err) {
      throw new Error('4003');
    }

    try {
      const [, updatedUser] = await models.Users.update({
        token: '',
      }, {
        where: { id },
        fields: ['token'],
        returning: true,
        plain: true,
        transaction,
      });
      transaction.commit();

      return updatedUser;
    } catch (err) {
      throw new Error('4004');
    }
  } catch (err) {
    console.log(err);
    transaction.rollback();
    throw err;
  }
};

export default async (req, res) => {
  const { id } = req.body;

  try {
    const loggedOut = await Logout({ id });
    return defaultSuccess(res, loggedOut);
  } catch ({ message }) {
    return defaultError(res, message);
  }
};
