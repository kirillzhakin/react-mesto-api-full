const jwt = require('jsonwebtoken');
const ReqAuthError = require('../errors/ReqAuthError');

const { NODE_ENV, JWT_TOKEN } = process.env;

const handleAuthError = (next) => {
  next(new ReqAuthError('Необходима авторизация'));
};

const auth = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(next);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_TOKEN : 'dev-secret');
  } catch (err) {
    return handleAuthError(next);
  }
  req.user = payload;
  return next();
};

module.exports = auth;
