const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  format: winston.format.combine(winston.format.colorize(), winston.format.json()),

  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],

});

const errorLogger = expressWinston.errorLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),

  transports: [
    new winston.transports.File({ filename: 'errors.log' }),
  ],
});

module.exports = { requestLogger, errorLogger };
