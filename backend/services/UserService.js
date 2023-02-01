const NotFoundError = require('../exeptions/NotFoundError');
const UnauthorizedError = require('../exeptions/UnauthorizedError');
const User = require('../models/User');

module.exports = {
  /**
   * Возвращает всех пользователей в базе.
   */
  async getAll() {
    return User.find({});
  },

  /**
   * Находит пользователя по ID в базе и возвращает его.
   * В случае невалидного ID выбрасывает исключение IncorrectDataError
   * Если пользователь не нашелся в базе выбрасывает исключение NotFoundError
   * @param {String} userId
   */
  async getOne(id) {
    const user = await User.findById(id);

    if (user === null) {
      throw new NotFoundError('Пользователь по указанному ID не найден.');
    }

    return user;
  },

  /**
   * Создание нового пользователя и запись в БД
   * @param {Object} userData
   */
  async create(userData) {
    return User.create(userData);
  },

  /**
   * Находит пользователя в базе по ID и обновляет его данные
   * @param {Object} userData
   * @param {String} id
   */
  async update(userData, id) {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });

    if (updatedUser === null) {
      throw new NotFoundError('Пользователь с указанным ID не найден');
    }

    return updatedUser;
  },

  /**
   * Изменяет аватар профиля
   * @param {String} avatar
   * @param {String} id
   */
  async updateAvatar(avatar, id) {
    const currentUser = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true },
    );

    if (currentUser === null) {
      throw new NotFoundError('Пользователь с указанным id не найден.');
    }

    return currentUser;
  },

  async login(email, password) {
    const user = await User.findUserByCredentials(email, password);

    if (!user) {
      throw new UnauthorizedError('Неверный логин или пароль');
    }

    return user;
  },
};
