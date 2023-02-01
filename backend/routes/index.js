const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./userRouter');
const cardRouter = require('./cardRouter');
const NotFoundError = require('../exeptions/NotFoundError');
const { validateCreateUser, validateLoginData } = require('../middlewares/validators');
const { create, login } = require('../controllers/UserController');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server was crashed!');
  }, 0);
});

router.post('/signup', validateCreateUser, create);
router.post('/signin', validateLoginData, login);

router.get('/logout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'logout' });
});
router.use(auth);
router.use('/', userRouter);
router.use('/', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;
