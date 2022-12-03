export default class Api {
    constructor(data) {
        this._baseUrl = data.baseUrl;
        this._headers = data.headers;
    }

    _checkResponse(response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(`Ошибка: ${response.status}`);
        }
      }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers
        })
        .then(res => {
          return this._checkResponse(res);
        })
      }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers
        })
        .then(res => {
          return this._checkResponse(res);
        })
      }

    setUserInfo(userName, userJob) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userName,
                about: userJob
            }),
        })
        .then(res => {
          return this._checkResponse(res);
        })
    }
}