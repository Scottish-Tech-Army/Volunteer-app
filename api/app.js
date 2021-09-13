import express from "express";

const app = express();

import data from './data.js';

app.get("/projects", function (req, res) {
  res.json(data.projects);
});

app.listen(5000, function (req, res) {
  console.log("App running on port 5000");
});
