export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

    _checkError(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ошибка: ${res.status}`);
    }

  // получение данных с сервера
  getInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  // изменение данных с сервера

  getUserInfoEdit(data) { // patchUserInfo //getUserInfo
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkError(res));
  }

    // изменение данных аватара
    getEditAvatar(data) { // patchAvatarInfo
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then((res) => this._checkError(res));
    }

  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }

  // добавление карточек на страницу
  getNewCard(data) { // postNewCard // getNewCard(data)
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data), // body: JSON.stringify(data)
    }).then((res) => this._checkError(res));
  }

  // удаление карточек
  getDeleteCard(cardId) { // deleteCard
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }

  // добавление лайка
  getLike(cardId) { // getLike
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  
  // удаление лайка
  getDeleteLike(cardId) { // deleteLike
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
}