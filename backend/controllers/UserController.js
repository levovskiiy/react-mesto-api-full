const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');
const ConflictError = require('../exeptions/ConflctError');
const BadRequestError = require('../exeptions/BadRequestError');
const { JWT_SECRET } = require('../utils/config');

module.exports = {
  /**
   * Получение всех пользователей
   * @param req
   * @param res
   * @param next
   * @return {Promise<void>}
   */
  async getAll(req, res, next) {
    try {
      const users = await UserService.getAll();

      res.send(users);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Получение пользователя по ID
   * @param req
   * @param res
   * @param next
   * @return {Promise<void>}
   */
  async getOne(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await UserService.getOne(userId);

      res.send(user);
    } catch (err) {
      if (err.name === 'CastError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    }
  },

  async getCurrent(req, res, next) {
    try {
      const user = await UserService.getOne(req.user.id);
      res.send(user);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Создание пользователя
   * @param req
   * @param res
   * @param next
   * @return {Promise<void>}
   */
  async create(req, res, next) {
    try {
      const {
        email, password, name, about, avatar,
      } = req.body;

      const hashPassword = await bcrypt.hash(password, 10);

      const createdUser = await UserService.create({
        email,
        name,
        about,
        avatar,
        password: hashPassword,
      });

      res.status(201).send(createdUser.toUserObj());
    } catch (err) {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors)
          .map((e) => e.message)
          .join((','))}`));
      } else {
        next(err);
      }
    }
  },

  /**
   * Обновление данных профиля
   * @param req
   * @param res
   * @param next
   * @return {Promise<void>}
   */
  async update(req, res, next) {
    try {
      const { name, about } = req.body;
      const { id } = req.user;

      const updatedUser = await UserService.update({ name, about }, id);

      res.send(updatedUser);
    } catch (err) {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    }
  },

  /**
   * Обновление аватара пользователя
   * @param req
   * @param res
   * @param next
   * @return {Promise<void>}
   */
  async updateAvatar(req, res, next) {
    try {
      const { avatar } = req.body;
      const { id } = req.user;

      const updatedAvatar = await UserService.updateAvatar(avatar, id);

      res.send(updatedAvatar);
    } catch (err) {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    }
  },

  /**
   *
   * @param {*} req
   * @param {import('express').Response} res
   * @param {*} next
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await UserService.login(email, password);

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt', token, { httpOnly: true, sameSite: true })
        .send({ message: 'logged!' });
    } catch (err) {
      next(err);
    }
  },
};
