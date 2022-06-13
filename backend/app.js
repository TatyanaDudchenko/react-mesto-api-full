const express = require('express');

const { PORT = 4000 } = process.env;
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { routes } = require('./routes/app');

const app = express();

const { login, createUser } = require('./controllers/users');
const { validationsLogin, validationsCreateUser } = require('./middlewares/validations');

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', express.json(), validationsLogin, login);
app.post('/signup', express.json(), validationsCreateUser, createUser);

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

// здесь обрабатываем все ошибки
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb ', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`Слушаем порт ${PORT}`);
  });
}

main();
