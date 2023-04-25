const express = require('express');
const app = express();
const routes = require('./routes/index');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/v1', routes);

app.use((req, res, next) => {
  const err = new Error("Something went wrong. Please try again.");
  err.status = 500;
  next(err);
});

app.use((err, req, res, next) => {
  const notFound = new Error('Resource Not Found');
  notFound.status = 404;
  next(notFound);
});

module.exports = app;
