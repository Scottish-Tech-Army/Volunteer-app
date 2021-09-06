import express from "express";

const app = express();

import data from './data.js';

app.get("/", function (req, res) {
  res.json(data);
});

app.listen(5000, function (req, res) {
  console.log("App running on port 5000");
});
