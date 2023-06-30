class Api {
  constructor(options) {
    const { baseUrl, token, errorHandler } = options;

    this._baseUrl = baseUrl
    this._token = token
    this._errorHandler = errorHandler
  }

  _makeRequest(url, options) {
    options = options || {}
    const { method = "GET", body } = options;
    let jsonBody = null;

    if (body) {
      jsonBody = JSON.stringify(body)
    }

    return fetch(`${this._baseUrl}/${url}`, {
      method: method,
      body: jsonBody,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject({"response": res})
        }

        return res.json()
      }).catch(this._errorHandler);
  }

  getInitialCards() {
    return this._makeRequest("/cards")
  }

  getUserProfile() {
    return this._makeRequest("/users/me")
  }

  changeUserProfile(name, about) {
    return this._makeRequest("/users/me", {
      method: "PATCH",
      body: {
        name: name,
        about: about
      }
    })
  }

  addCard(name, link) {
    return this._makeRequest("/cards", {
      method: "POST",
      body: {
        name: name,
        link: link
      }
    })
  }

  deleteCard(id) {
    return this._makeRequest(`/cards/${id}`, { method: "DELETE" });
  }

  addCardLike(id) {
    return this._makeRequest(`/cards/${id}/likes`, { method: "PUT" });
  }

  deleteCardLike(id) {
    return this._makeRequest(`/cards/${id}/likes`, { method: "DELETE" });
  }

  changeAvatar(avatar) {
    return this._makeRequest("/users/me/avatar", {
      method: "PATCH",
      body: {
        avatar: avatar
      }
    })
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  token: "31abe394-3f89-489d-9ccd-e96da397bf7c",
  errorHandler: (args) => console.log(args)}
)

export default api;