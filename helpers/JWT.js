import JWT from 'jsonwebtoken';

export const createJWT = (dataToSign) => JWT.sign(dataToSign, process.env.JWTKEY, { algorithm: 'HS256' });

export const verifyJWT = (jwt, verifToken = process.env.JWTKEY) => JWT.verify(jwt, verifToken);

export const decodeJWT = (token) => JWT.decode(token);
