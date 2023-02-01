import RequestError from './RequestError';


class Auth {
  static BASE_URL = 'https://api.mesto.levovskiiy.nomoredomainsclub.ru'

  constructor(headers) {
    this.headers = headers;
  }

  request(endpoint, options) {
    return fetch(`${Auth.BASE_URL}${endpoint}`, { credentials: 'include', ...options })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(new RequestError(`Ошибка запроса: Код - ${response.status}`, response));
      })
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
      body: JSON.stringify(userData),
    });
  }

  checkToken(token) {
    return this.request('/users/me', {
      method: 'GET',
      headers: {
        ...this.headers,
      },
    });
  }
}

const auth = new Auth({
  'Content-Type': 'application/json'
});

export default auth;

