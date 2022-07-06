const jwt = require('jsonwebtoken');
const ReqAuthError = require('../errors/ReqAuthError');

const { NODE_ENV, JWT_TOKEN } = process.env;

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
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_TOKEN : 'dev-secret');
  } catch (err) {
    return handleAuthError(next);
  }
  req.user = payload;
  return next();
};

module.exports = authorization;
