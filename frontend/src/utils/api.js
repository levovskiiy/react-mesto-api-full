/**
 * Сервис-обертка над API сервера.
 */
class Api {
  /**
   * @param {string} baseUrl URL API сервера 
   * @param {Object} params Различные параметры для запросов на сервер.
   */
  constructor(baseUrl, settings) {
    this._baseUrl = baseUrl;
    this._headers = settings.headers;
    this._credentials = settings.credentials ?? 'include';
  }

  /**
   * Конфигурирует запрос на API. 
   * Возбуждает исключение если запрос был отклонен
   * @param {string} path эндпоинт запроса
   * @param {object} requestParameters объект с настройками запроса
   * @param {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} requestParameters.method HTTP метод запроса
   * @param {object | undefined} requestParameters.headers Объект загловок запроса
   * @param {object | undefined} requestParameters.body Тело запроса
   * @param {string | undefined} requestParameters.credentials уазывает, должен ли запрос отправлять куки 
   * и авторизационные заголовки
   * @returns {Promise<object>} Возвращает данные в виде объекта
   * @private
   */
  async _request(path, requestParameters) {
    const response = await fetch(`${this._baseUrl}${path}`, {
      method: requestParameters.method,
      body: requestParameters?.body,
      credentials: this._credentials,
      headers: { ...this._headers, ...requestParameters?.headers },
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Запрос завершился с ошибкой. Статус ошибки - ${response.status}`);
  }

  /**
   * Базовый HTTP GET запрос на сервис.
   * @param {string} path эндпоинт запроса
   * @param {object} queryParams необязательные параметры запроса
   * @returns {Promise<object>}
   */
  _get(path, queryParams = {}) {
    return this._request(path, { method: 'GET', ...queryParams })
  }

  /**
   * Базовый HTTP POST запрос на сервис.
   * @param {string} path эндпоинт запроса
   * @param {object} data передаваемые данные на сервер
   * @param {object} queryParams необязательные параметры запроса
   * @returns {Promise<object>}
   */
  _post(path, data = {}, queryParams = {}) {
    return this._request(path, { method: 'POST', body: JSON.stringify(data), ...queryParams })
  }

  /**
   * Базовый HTTP PATCH запрос на сервис. Выполняет запрос на частичное 
   * обновление ресурса на сервере.
   * @param {string} path эндпоинт запроса
   * @param {object} data передаваемые данные на сервер
   * @param {object} queryParams необязательные параметры запроса
   * @returns {Promise<object>}
   */
  _patch(path, data = {}, queryParams = {}) {
    return this._request(path, { method: 'PATCH', body: JSON.stringify(data), ...queryParams })
  }

  /**
   * Базовый HTTP DELETE запрос на сервис. Выполняет запрос на удаление ресурса с сервера.
   * @param {string} path эндпоинт запроса
   * @param {object} queryParams необязательные параметры запроса
   * @returns {Promise<object>}
   */
  _delete(path, queryParams = {}) {
    return this._request(path, { method: 'DELETE', ...queryParams })
  }

  /**
   * Базовый HTTP PUT запрос на сервис. 
   * Выполянет запрос на добавление или полное изменение ресурса на сервере
   * @param {string} path 
   * @param {object} queryParams 
   * @returns {Promise<object>}
   */
  _put(path, queryParams = {}) {
    return this._request(path, { ...queryParams });
  }

  /**
   * Возвращает фото-карточки пользователей ресурса. 
   * @returns {Promise<Array<object>>} Массив из объектов с данными карточек
   */
  getInitialCards() {
    return this._get('/cards');
  }

  /**
   * Возвращает данные текущего пользователя ресурса. 
   * @returns {Promise<Object>} Объект с именеи и описанием пользователя
   */
  getUserData() {
    return this._get('/users/me');
  }

  /**
   * Меняет данные профиля пользователя на сервере. 
   * @param {Object} userData
   * @returns {Promise<Object>} Объект с обновленными данными пользователя
   */
  editProfile({ username, description }) {
    return this._patch('/users/me', { name: username, about: description })
  }

  /**
   * Создает новую карточку на сервере. 
   * @param {Card} card
   * @returns {Promise<Object>} Объект новосозданной карточки пользователя
   */
  postCard(card) {
    return this._post('/cards', card);
  }

  /**
   * Удаляет карточку пользователя с ресурса. 
   * Удалить данные чужего пользователя не возможно
   * @param {string} cardId идентификатор карточки
   * @returns {Promise<object>} Объект с данными удаленной карточки
   */
  deleteCard(cardId) {
    return this._delete(`/cards/${cardId}`);
  }

  /**
   * В зависимости от предиката isLiked добавляет или удаляет лайк с карточки.
   * @param {string} id идентификатор карточки
   * @param {Boolean} isLiked состояние лайка на карточке
   * @returns {Promise<object>} Объект с данными карточки
   */
  changeLikeStatus(id, isLiked) {
    return isLiked ? this.unlikeCard(id) : this.likeCard(id);
  }

  /**
   * Добавляет к карточке лайк пользователя. 
   * Пользователь добавляется в массив likes у объекта карточки.
   * @param {string} cardId идентификатор карточки
   * @returns {Promise<Object>} Объект с данными лайкнутой карточки
   */
  likeCard(cardId) {
    return this._put(`/cards/${cardId}`);
  }

  /**
   * Снимает лайк с карточки.
   * Пользователь удаляется из массива likes у объекта карточки.
   * @param {string} cardId идентификатор карточки
   * @returns {Promise<object>} Объект с данными дизлайкнутой карточки
   */
  unlikeCard(cardId) {
    return this._delete(`/cards/${cardId}/likes`);
  }

  /**
   * Метод изменяет фото профиля пользователя.
   * Возвращаемое значение представляет собой объект пользователя с измененым полем avatar
   * @param {string} avatarLink ссылка на картинку
   * @returns {Promise<object>}
   */
  replaceAvatar(avatarLink) {
    return this._patch('/users/me/avatar', { avatar: avatarLink })
  }

  /**
   * Метод возвращает данные о профиле и карточки пользывателей ресура.
   * @returns {Promise<Awaited<Array<Object>>>}
   */
  getData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }
}


const api = new Api('https://api.mesto.levovskiiy.nomoredomainsclub.ru', {
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
