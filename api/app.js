const express = require('express');
const app = express();
const routes = require('./routes');

app.use('/', routes);

// app.use((req, res, next) => {
//   const err = new Error("Something went wrong. Please try again.");
//   err.status = 500;
//   next(err);
// });

// app.use((err, req, res, next) => {
//   const notFound = new Error('Resource Not Found');
//   notFound.status = 404;
//   next(notFound);
// });

app.listen(5000, function (req, res) {
  console.log("App running on on locatlhost:5000");
});
