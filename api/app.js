import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", function (req, res, next) {
  
  // const fetch = require('node-fetch');

  fetch('https://sta2020.atlassian.net/rest/api/3/project/search', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        // below use email address you used for jira and generate token from jira
        'example@hotmail.com:<your token>'
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  })
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    if(response.status >= 200 && response.status < 300){
      return response.json();
    }
    return Promise.reject(new Error(response.statusText));
  })
  .then(json => res.json(json))
  .catch(err => next(err));
});

app.listen(5000, function (req, res) {
  console.log("App running on port 5000");
});
