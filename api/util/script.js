import express from "express";
import fetch from "node-fetch";
import dotenv from 'dotenv';
import { writeToJsonFile } from '../js/writeToJsonFile.js';
dotenv.config();

const app = express();
const api_key = process.env.API_KEY;

app.get("/", function (req, res, next) {
  
  fetch('https://sta2020.atlassian.net/rest/api/2/search?jql=project=RES&maxResults=1000', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        // below use email address you used for jira and generate token from jira
        `hamidq88@gmail.com:${api_key}`
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
  .then(json => {
    
    const projectName = json.issues.map(x => ({ name: x['fields'].summary }));
    writeToJsonFile( projectName );
    console.log(projectName);
    res.json(json)
  })
  .catch(err => next(err));
});

app.listen(5000, function (req, res) {
  console.log("App running on port 5000");
});
