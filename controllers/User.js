import models from '../models';
import { createJWT, verifyJWT } from '../helpers/JWT';

export const updateUserToken = async (userId, toCodify, transaction) => {
  console.log('Setando Token para Usuário');
  const token = createJWT(toCodify);

  return models.Users.update({
    token,
  }, {
    fields: ['token'],
    transaction,
    where: {
      id: userId,
    },
  });
};

export const isUserLogged = async (token, transaction) => {
  try {
    const { id } = verifyJWT(token);

    return models.Users.findByPk(id, {
      attributes: ['id', 'username', 'token'],
      transaction,
    });
  } catch (err) {
    return null;
  }
};
