import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

import data from './data.js';

app.get("/projects", function (req, res) {
  res.json(data.projects);
});

app.listen(5000, function (req, res) {
  console.log("App running on port 5000");
});

