  class Api {
    constructor({baseUrl}) {
      this.baseUrl = baseUrl;
    }

  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(`Ошибка ${result.status}`);
  }

  // метод для загрузки информации о пользователе с сервера
  getUserData() {
  return fetch(`${this.baseUrl}/users/me`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }
  })
    .then(this._checkResponse)

  }

  // метод для загрузки начальных карточек с сервера
  getInitialCards() {
  return fetch(`${this.baseUrl}/cards`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }
  })
    .then(this._checkResponse)

  }

  // метод для редактирования профиля
  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
    .then(this._checkResponse)

  }

  // метод для добавления новой карточки
  createNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    })
  })
    .then(this._checkResponse)

  }

  // метод для удаления карточки
  deleteCard(itemId) {
    return fetch(`${this.baseUrl}/cards/${itemId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: itemId,
    })
  })
    .then(this._checkResponse)

  }

  // метод для постановки лайка
  putLike(itemId) {
    return fetch(`${this.baseUrl}/cards/${itemId}/likes`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: itemId,
    })
  })
    .then(this._checkResponse)

  }

  // метод для удаления лайка
  deleteLike(itemId) {
    return fetch(`${this.baseUrl}/cards/${itemId}/likes`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: itemId,
    })
  })
    .then(this._checkResponse)

  }

   // метод для обновления аватара пользователя
   updatedAvatar(avatarData) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarData.avatar
    })
  })
    .then(this._checkResponse)

  }


}

const api = new Api({
  baseUrl: 'https://api.tanya-dudchenko.nomoredomains.xyz',
  // token: localStorage.getItem("jwt"),
});

export default api

// class Api {
//   constructor({baseUrl, token}) {
//     this.baseUrl = baseUrl;
//     this.token = token;
//   }
