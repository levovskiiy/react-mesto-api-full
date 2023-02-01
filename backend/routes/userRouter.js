const { Router } = require('express');
const {
  validateUpdateUser,
  validateUpdateAvatarUser,
  validateGetUser,
} = require('../middlewares/validators');
const UserController = require('../controllers/UserController');

const userRouter = new Router();

userRouter.get('/users/', UserController.getAll);
userRouter.get('/users/me', UserController.getCurrent);
userRouter.get('/users/:userId', validateGetUser, UserController.getOne);
userRouter.patch('/users/me', validateUpdateUser, UserController.update);
userRouter.patch(
  '/users/me/avatar',
  validateUpdateAvatarUser,
  UserController.updateAvatar,
);

module.exports = userRouter;
