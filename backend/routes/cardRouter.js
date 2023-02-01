const { Router } = require('express');
const {
  validateCreateCard,
  validateActionCard,
} = require('../middlewares/validators');

const CardController = require('../controllers/CardController');

const cardRouter = new Router();

cardRouter.get('/cards', CardController.getAll);
cardRouter.post('/cards', validateCreateCard, CardController.create);
cardRouter.delete('/cards/:cardId', validateActionCard, CardController.delete);
cardRouter.put('/cards/:cardId/likes', validateActionCard, CardController.like);
cardRouter.delete(
  '/cards/:cardId/likes',
  validateActionCard,
  CardController.unlike,
);

module.exports = cardRouter;
