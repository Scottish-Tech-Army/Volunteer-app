import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", function (req, res, next) {
  
  fetch('https://sta2020.atlassian.net/rest/api/2/search?jql=project=RES&maxResults=1000', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        // below use email address you used for jira and generate token from jira
        'hamidq88@gmail.com:rcakTK4J8yNz6JPx1SwLC9A4'
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
