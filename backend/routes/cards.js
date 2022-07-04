const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regUrl } = require('../utils/reg');

const {
  cardsController, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// GET /cards — возвращает все карточки
cardRouter.get('/', cardsController);

// POST /cards — создаёт карточку
cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regUrl),
  }),
}), createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

// PUT /cards/:cardId/likes — поставить лайк карточке
cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

module.exports = cardRouter;
