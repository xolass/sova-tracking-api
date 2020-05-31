import bcrypt from 'bcrypt';
import models from '../../models';
import { defaultError, defaultSuccess } from '../../helpers/ResponseMessages';
import { updateUserToken, isUserLogged } from '../User';


const Login = async ({
  username, password, token, saveLogin,
}) => {
  const transaction = await models.sequelize.transaction();

  try {
    const autoLogin = await isUserLogged(token, transaction);

    if (autoLogin) {
      await transaction.commit();

      return autoLogin;
    }

    const where = { username };

    const user = await models.Users.findOne({ where, transaction });
    if (!user) throw new Error('4000');


    return bcrypt.compare(password, user.password, async (passErr, same) => {
      if (!same) throw new Error('4001');
      if (passErr) throw new Error('5000');

      if (saveLogin) {
        await updateUserToken(user.id, { id: user.id }, transaction);
      }

      const updatedUser = await models.Users.findOne({
        where,
        attributes: ['id', 'username', 'token'],
        transaction,
      });

      await transaction.commit();

      return updatedUser;
    });
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

export default async (req, res) => {
  const {
    username, password, token, saveLogin,
  } = req.body;

  try {
    const isLogged = await Login({
      username, password, token, saveLogin,
    });

    return defaultSuccess(res, isLogged);
  } catch ({ message }) {
    return defaultError(res, message);
  }
};
