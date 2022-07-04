const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regUrl } = require('../utils/reg');

const {
  usersController, userController, updateUserProfile, updateAvatarProfile, getMe,
} = require('../controllers/users');

// GET /users — возвращает всех пользователей
userRouter.get('/', usersController);

// GET /users/me - возвращает информацию о текущем пользователе
userRouter.get('/me', getMe);

// GET /users/:userId - возвращает пользователя по _id
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), userController);

// PATCH /users/me — обновляет профиль
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);

// PATCH /users/me/avatar — обновляет аватар
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regUrl).required(),
  }),
}), updateAvatarProfile);

module.exports = userRouter;
