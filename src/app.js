const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');

// Import routes
const studentRouter = require('./routes/students.routes');

// App instance
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Routes
app.use('/students', studentRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  const status = err.status || 500;
  const message = err.message || err;
  // eslint-disable-next-line no-console
  console.error(`Error en el servidor status ${status} \nMensaje: ${message}`);
  res.status(status).send(message);
});

module.exports = app;
