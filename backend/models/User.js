// eslint-disable-next-line import/no-extraneous-dependencies
const { isEmail, isURL } = require('validator');
const { compare } = require('bcrypt');
const { Schema, model } = require('mongoose');
const UnauthorizedError = require('../exeptions/UnauthorizedError');

const User = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: isEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: isURL,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

User.methods.toUserObj = function toUserObj() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

/**
 * Имплементирует логику авторзации пользователя в системе.
 * Выбрасывает исключение UnauthorizedError в случае неверных переданных данных
 * @param {string} email email пользователя
 * @param {string} password пароль пользователя
 * @returns {string | UnauthorizedError} JWT токен
 */
User.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    throw new UnauthorizedError('Неверный логин или пароль');
  }

  const comapred = await compare(password, user.password);

  if (!comapred) {
    throw new UnauthorizedError('Неверный логин или пароль');
  }

  return user;
};

module.exports = model('User', User);
