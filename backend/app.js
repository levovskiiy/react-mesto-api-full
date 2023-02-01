const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const { default: helmet } = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsMiddleware = require('./middlewares/cors');
const routes = require('./routes/index');

const DB_CONN = 'mongodb://localhost:27017/mestodb';
const { PORT = 5000 } = process.env;

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_CONN);

app.use(corsMiddleware);
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errors(), (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });

  next();
});
app.listen(PORT);
