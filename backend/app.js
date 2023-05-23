const express = require('express');
const mongoose = require('mongoose');

const errorsMiddleware = require('./middlewares/errors');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use('/', require('./routes/index'));

app.use(errorsMiddleware);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
