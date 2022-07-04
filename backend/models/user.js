const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { regUrl, regEmail } = require('../utils/reg');

const ReqAuthError = require('../errors/ReqAuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Длина имени пользователя меньше 2-х символов'],
    maxlength: [30, 'Длина имени пользователя более 30-и символов'],
  },

  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Длина информации о пользователе меньше 2-х символов'],
    maxlength: [30, 'Длина информации о пользователе более 30-и символов'],
  },

  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return regUrl.test(v);
      },
      message: 'Некорректный адрес ссылки',
    },
  },

  email: {
    type: String,
    unique: true,
    required: [true, 'Вы не указали почтовый адрес'],
    validate: {
      validator(v) {
        return regEmail.test(v);
      },
      message: 'Неправильный формат почты',
    },
  },

  password: {
    type: String,
    required: [true, 'Вы не указали пароль'],
    minlength: [4, 'Длина пароля меньше 4-х символов'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function userFunction(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ReqAuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ReqAuthError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
