import models from '../models';
import { createJWT, verifyJWT } from '../helpers/JWT';

export const updateUserToken = async (userId, toCodify, transaction) => {
  console.log('Setando Token para Usuário');
  const token = createJWT(toCodify);
  return models.Users.update({
    token,
  }, {
    fields: ['token'],
    where: {
      id: userId,
    },
    returning: true,
    plain: true,
    transaction,
  });
};

export const isUserLogged = async (token, transaction) => {
  try {
    const { id, autoLogin } = verifyJWT(token);
    if (!autoLogin) return null;

    return models.Users.findByPk(id, {
      transaction,
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};
