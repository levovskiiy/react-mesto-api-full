const {
  celebrate, Joi, Segments, CelebrateError,
} = require('celebrate');
const { isValidObjectId } = require('mongoose');
const { isURL } = require('validator');

const minLength = 2;
const maxLength = 30;

const createValidator = (schemaObj, segment) => celebrate(
  { [segment]: Joi.object().keys(schemaObj).unknown(true) },
);

const correctURL = Joi.string().custom((value) => {
  if (isURL(value, { require_protocol: true })) {
    return value;
  }

  throw new CelebrateError('Невалидный URL');
});

const correctId = Joi.string()
  .alphanum()
  .custom((value) => {
    if (isValidObjectId(value)) {
      return value;
    }

    throw new CelebrateError('Невалидный ID');
  });

const loginData = {
  email: Joi.string().required().email(),
  password: Joi.string().required(),
};

module.exports = {
  validateGetUser: createValidator(
    {
      userId: correctId,
    },
    Segments.PARAMS,
  ),
  validateCreateUser: createValidator(
    {
      ...loginData,
      name: Joi.string().min(minLength).max(maxLength),
      about: Joi.string().min(minLength).max(maxLength),
      avatar: correctURL,
    },
    Segments.BODY,
  ),

  validateLoginData: createValidator({ ...loginData }, Segments.BODY),

  validateUpdateAvatarUser: createValidator(
    {
      avatar: correctURL.required(),
    },
    Segments.BODY,
  ),

  validateUpdateUser: createValidator(
    {
      name: Joi.string().min(minLength).max(maxLength).required(),
      about: Joi.string().min(minLength).max(maxLength).required(),
    },
    Segments.BODY,
  ),

  validateCreateCard: createValidator(
    {
      name: Joi.string().min(minLength).max(maxLength).required(),
      link: correctURL.required(),
    },
    Segments.BODY,
  ),

  validateActionCard: createValidator(
    {
      cardId: correctId.required(),
    },
    Segments.PARAMS,
  ),
};
