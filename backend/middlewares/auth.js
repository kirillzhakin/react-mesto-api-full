const jwt = require('jsonwebtoken');
const ReqAuthError = require('../errors/ReqAuthError');

const JWT_TOKEN = 'super-strong-secret';

const handleAuthError = (next) => {
  next(new ReqAuthError('Необходима авторизация'));
};

const authorization = (req, _res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return handleAuthError(next);
  }
  let payload;

  try {
    payload = jwt.verify(token, JWT_TOKEN);
  } catch (err) {
    return handleAuthError(next);
  }
  req.user = payload;
  return next();
};

module.exports = authorization;
