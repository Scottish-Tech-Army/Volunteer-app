import express from "express";

const app = express();

app.get("/", function (req, res) {
  res.json({ message: "Hello World" });
});

app.listen(5000, function (req, res) {
  console.log("App running on port 5000");
});
