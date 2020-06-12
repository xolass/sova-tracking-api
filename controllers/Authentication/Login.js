import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import models from '../../models';
import { defaultError, defaultSuccess } from '../../helpers/ResponseMessages';
import { updateUserToken, isUserLogged } from '../User';


const Login = async ({
  username, password, saveLogin, token,
}) => {
  const transaction = await models.sequelize.transaction();

  try {
    if (token) {
      const autoLogin = await isUserLogged(token, transaction);

      if (autoLogin) {
        await transaction.commit();

        return autoLogin;
      }
    }

    const where = { username };

    let user = await models.Users.findOne({ where, transaction });
    if (!user) throw new Error('4000');

    try {
      const same = await bcrypt.compare(password, user.password);
      if (!same) throw new Error('4001');
    } catch (passErr) {
      throw new Error('4001');
    }

    [, user] = await updateUserToken(user.id, {
      id: user.id,
      autoLogin: saveLogin,
      aud: v4(),
    }, transaction);
    await transaction.commit();

    return user;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};


export default async (req, res) => {
  const {
    username, password, saveLogin,
  } = req.body;

  const token = req.headers.authorization;

  try {
    const isLogged = await Login({
      username, password, token, saveLogin,
    });
    return defaultSuccess(res, isLogged);
  } catch ({ message }) {
    return defaultError(res, message);
  }
};
