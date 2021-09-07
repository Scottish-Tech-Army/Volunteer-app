import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", function (req, res) {
  res.json({
    fields: {
      project: {
        key: "TEST",
      },
      summary: "Some data from the express server",
      description: "Creating an issue while setting custom field values",
      issuetype: {
        name: "Bug",
      },
      customfield_11050: "Free text!.",
    },
  });
});

app.listen(5000, function (req, res) {
  console.log("App running on port 5000");
});
