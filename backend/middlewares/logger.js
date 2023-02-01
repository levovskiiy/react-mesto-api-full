const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  format: winston.format.combine(winston.format.colorize(), winston.format.json()),

  transports: [
    new winston.transports.File({ filename: 'request.log' }),
    new winston.transports.Console(),
  ],

});

const errorLogger = expressWinston.errorLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),

  transports: [
    new winston.transports.File({ filename: 'errors.log' }),
    new winston.transports.Console(),
  ],
});

module.exports = { requestLogger, errorLogger };
