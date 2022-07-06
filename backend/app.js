/* eslint-disable import/order */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

require('dotenv').config();

const { PORT } = process.env;

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const authRouter = require('./routes/auth');
const auth = require('./middlewares/auth');

const cors = require('cors');

const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => {
    console.log('Подключен к базе данных');
  });

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', authRouter);
app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorLogger);

app.use('*', (_req, _res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());
app.use(errorHandler, () => { console.log('Ошибка'); });

app.listen(PORT, () => {
  console.log(`Порт ${PORT}`);
});
