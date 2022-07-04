const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');
const CastError = require('../errors/CastError');

const JWT_TOKEN = 'super-strong-secret';

// POST /signin - авторизация пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_TOKEN, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true }).send({ token, message: 'Авторизация прошла успешно' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// GET /users — возвращает всех пользователей
const usersController = (_req, res, next) => {
  User.find()
    .then((data) => res.send(data))
    .catch(next);
};

// GET /users/:userId - возвращает пользователя по _id
const userController = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// POST /signup - создает пользователя
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const { _id } = user;
      res.send({
        _id,
        name,
        about,
        avatar,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь уже существует'));
      }
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me — обновляет профиль
const updateUserProfile = (req, res, next) => {
  const {
    name, about, email, password,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name, about, email, password,
  }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Запрашиваемый пользователь не найден' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me/avatar — обновляет аватар
const updateAvatarProfile = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// GET /users/me - возвращает информацию о текущем пользователе
const getMe = (req, res, next) => {
  const { _id } = req.user;
  User.find({ _id })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      return res.send(...user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  usersController, userController, createUser, updateUserProfile, updateAvatarProfile, login, getMe,
};
