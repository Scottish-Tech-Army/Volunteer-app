import express from 'express';
const app = express();
import routes from './routes/index.js';

app.use('/', routes);

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

export default app;