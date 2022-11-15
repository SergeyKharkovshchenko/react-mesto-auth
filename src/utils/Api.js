import { Component } from "react";

class Api extends Component {
  constructor(setting) {
    super(setting);
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._address}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._address}cards`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getUserAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  setUserInfo(name, about) {
    return fetch(`${this._address}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  addMyCardToCloud(name, link) {
    return fetch(`${this._address}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCardFromCloud(id) {
    return fetch(`${this._address}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  setUserAvatar(newAvatarLink) {
    return fetch(`${this._address}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatarLink,
      }),
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._address}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => this._getResponseData(res));
    } else {
      return fetch(`${this._address}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._getResponseData(res));
    }
  }
}

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-50/",
  headers: {
    authorization: "9437105d-f22c-4ac9-bb21-2171c030d2d7",
    "Content-Type": "application/json",
  },
});

export default api;
