import { verifyJWT } from '../helpers/JWT';
import { defaultError } from '../helpers/ResponseMessages';
import models from '../models';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    try {
      const isExpired = await models.ExpiredTokens.findOne({
        where: {
          expiredToken: authorization,
        },
      });
      if (isExpired) throw new Error();

      verifyJWT(authorization);
      return next();
    } catch (err) {
      throw new Error('4030');
    }
  } catch ({ message }) {
    return defaultError(res, message);
  }
};
