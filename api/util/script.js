import express from "express";
import fetch from "node-fetch";
import dotenv from 'dotenv';
import { writeToJsonFile } from '../js/writeToJsonFile.js';
dotenv.config();

const app = express();
const api_key = process.env.API_KEY;
const email = process.env.EMAIL;

app.get("/", function (req, res, next) {
  
  fetch('https://sta2020.atlassian.net/rest/api/2/search?jql=project=RES&maxResults=1000', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        // below use email address you used for jira and generate token from jira
        `${email}:${api_key}`
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
    // console.log(json.issues);
    const ResData = json.issues.map(x => (
      { 
        projectName: x['fields'].summary, 
        description: x['fields'].description, 
        jobRole: x['fields'].customfield_10113,
        projectType: x['fields'].customfield_10112,
        candidateTimeNeeded: x['fields'].customfield_10062,
        suitableForBuddy: x['fields'].customfield_10108 ? x['fields'].customfield_10108.value : 'none'     
      }));
    writeToJsonFile( ResData  );
    console.log(ResData);
    res.json(json)
  })
  .catch(err => next(err));
});

app.listen(5000, function (req, res) {
  console.log("App running on port 5000");
});
