//описаны запросы к серверу
class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получение карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers }).then(
      this._handleResponse
    );
  }

  // создание карточек
  createInitialCards(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleResponse);
  }

  // удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // получение данных о пользователе с сервера
  getInfoUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // редактирование данных пользователя
  editInfoUser(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse);
  }

  // изменение аватара
  editAvatarUser(url) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._handleResponse);
  }

  // Поставить лайк
  addLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // Убрать лайк
  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

const api = new Api({
  url: "https://domainname.anastasiya.nomoredomains.monster",
  headers: {
    authorization: "f1b678bd-8daa-4ddc-9a95-4730e9a93182",
    "Content-Type": "application/json",
  },
});

export default api;
