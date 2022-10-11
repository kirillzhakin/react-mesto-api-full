import { API_URL } from "../utils/constants.js";

class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
  }

  //  1. Загрузка информации о пользователе с сервера
  getUserInfo(token) {
    return fetch(`${this.baseUrl}users/me`, {
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  // 2. Загрузка карточек с сервера
  getInitialCards(token) {
    return fetch(`${this.baseUrl}cards`, {
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  // 3. Редактирование профиля
  setUserInfo({ name, about }, token) {
    return fetch(`${this.baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResponseData);
  }

  // 4. Добавление новой карточки
  createCard(newCard, token) {
    return fetch(`${this.baseUrl}cards`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    }).then(this._getResponseData);
  }

  // 5. Отображение количества лайков карточки
  likeCard(cardId, token) {
    return fetch(`${this.baseUrl}cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  // 7. Удаление карточки
  deleteCard(cardId, token) {
    return fetch(`${this.baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  // 8. Постановка и снятие лайка
  dislikeCard(cardId, token) {
    return fetch(`${this.baseUrl}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData);
  }

  // 9. Обновление аватара пользователя
  setAvatar(avatar, token) {
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatar),
    }).then(this._getResponseData);
  }

  // Если сервер вернул ошибку, отклоняем Промис
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const token = localStorage.getItem("token");

console.log(`Это api ${token}`);

// Подключение Api
export const api = new Api({
  baseUrl: API_URL,
});
