import RequestError from './RequestError';


class Auth {
  constructor(base_url, headers) {
    this._base_url = base_url;
    this.headers = headers;
  }

  async request(endpoint, options) {
    const response = await fetch(`${this._base_url}${endpoint}`, { credentials: 'include', ...options });
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new RequestError(`Ошибка запроса: Код - ${response.status}`, response));
  }

  /**
   * @param {{password: string, email: string}} userData
   * @returns Promise
   */
  register(userData) {
    return this.request('/signup', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
      }),
    });
  }

  /**
   * @param {Object} userData
   * @returns {Promise<*|undefined>}
   */
  authorize(userData) {
    return this.request('/signin', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
      }),
    });
  }

  checkToken() {
    return this.request('/users/me', {
      method: 'GET',
      headers: {
        ...this.headers,
      },
    });
  }
}

const auth = new Auth('https://mesto.levovskiiy.nomoredomainsclub.ru', {
  'Content-Type': 'application/json'
});

export default auth;

