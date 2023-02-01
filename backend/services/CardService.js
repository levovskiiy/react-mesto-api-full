const Card = require('../models/Card');
const NotFoundError = require('../exeptions/NotFoundError');
const ForbiddenError = require('../exeptions/ForbiddenError');

module.exports = {
  /**
   * Достает из базы данных все карточки
   */
  async getAll() {
    return Card.find({});
  },

  /**
   * Создание карточки
   * @param {Object} cardData
   * @return {Promise<Card>}
   */
  async create(cardData) {
    return Card.create(cardData);
  },

  /**
   * Находит карточку у пользователя и удаляет ее
   * @param {String} cardId
   * @param {String} userId
   */
  async delete(cardId, userId) {
    const card = await Card.findById(cardId);

    if (card === null) {
      throw new NotFoundError('Карточка с указанным ID не найдена.');
    }

    if (card.owner.toString() !== userId) {
      throw new ForbiddenError(
        'Переданный ID пользователя не совпадает с ID пользователя карточки.',
      );
    }

    return card.delete();
  },

  /**
   * Ставит лайк карточке у пользователя
   * @param {String} cardId
   * @param {String} userId
   */
  async like(cardId, userId) {
    const likedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).populate(['owner', 'likes']);

    if (likedCard === null) {
      throw new NotFoundError('Передан несуществующий id карточки');
    }

    return likedCard;
  },

  /**
   * Ставит дизлайк карточке у пользователя
   * @param {String} cardId
   * @param {String} userId
   */
  async unlike(cardId, userId) {
    const unlikedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).populate(['owner', 'likes']);

    if (unlikedCard === null) {
      throw new NotFoundError('Передан несуществующий id карточки');
    }

    return unlikedCard;
  },
};
