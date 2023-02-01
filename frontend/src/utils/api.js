
class Api {
  constructor({ baseUrl, cohort, headers }) {
    this._baseUrl = `${baseUrl}/v1/${cohort}`;
    this._headers = headers;
  }

  /**
   * Базовый метод обработки запроса на сервер.
   * @param {string} path
   * @param {string} method
   * @param {Object} headers
   * @param {string | null} body
   * @returns {Promise<Object>}
   * @private
   */
  _request({ path, method, headers = {}, body = null }) {
    return fetch(`${this._baseUrl}/${path}`, {
      method,
      body,
      headers: { ...this._headers, ...headers },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Запрос завершился с ошибкой. Статус ошибки - ${response.status}`);
    });
  }

  /**
   * @returns {Promise<Array<Object>>}
   */
  getInitialCards() {
    return this._request({
      path: 'cards',
      method: 'GET',
    });
  }

  /**
   * @returns {Promise<Object>}
   */
  getUserData() {
    return this._request({
      path: 'users/me',
      method: 'GET',
    });
  }

  /**
   *
   * @param {Object} userData
   * @returns {Promise<Object>}
   */
  editProfile(userData) {
    return this._request({
      path: 'users/me',
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userData.username,
        about: userData.description,
      }),
    });
  }

  /**
   * @param {Card} card
   * @returns {Promise<Object>}
   */
  postCard(card) {
    return this._request({
      path: 'cards',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card),
    });
  }

  /**
   *
   * @param {string} cardId
   * @returns {Promise<Object>}
   */
  deleteCard(cardId) {
    return this._request({
      path: `cards/${cardId}`,
      method: 'DELETE',
    });
  }

  changeLikeStatus(id, isLiked) {
    return isLiked ? this.unlikeCard(id) : this.likeCard(id);
  }

  /**
   *
   * @param {string} cardId
   * @returns {Promise<Object>}
   */
  likeCard(cardId) {
    return this._request({
      path: `cards/${cardId}/likes`,
      method: 'PUT',
    });
  }

  /**
   *
   * @param {string} cardId
   * @returns {Promise<Object>}
   */
  unlikeCard(cardId) {
    return this._request({
      path: `cards/${cardId}/likes`,
      method: 'DELETE',
    });
  }

  /**
   *
   * @param {string} avatarLink
   * @returns {Promise<Object>}
   */
  replaceAvatar(avatarLink) {
    return this._request({
      path: 'users/me/avatar',
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    });
  }

  /**
   *
   * @returns {Promise<Awaited<Array<Object>>>}
   */
  getData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }
}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
