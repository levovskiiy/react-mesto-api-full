require('dotenv').config();

const { NODE_ENV = 'development', JWT_SECRET = 'JWT_KEY_DEV' } = process.env;

module.exports = { NODE_ENV, JWT_SECRET };
