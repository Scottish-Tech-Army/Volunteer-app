import express from "express";
import fetch from "node-fetch";
import dotenv from 'dotenv';
import { writeToJsonFile } from '../js/writeToJsonFile.js';
dotenv.config();

const app = express();
const api_key = process.env.API_KEY;
const email = process.env.EMAIL;

app.get("/", function (req, res, next) {
  const urls = [
    'https://sta2020.atlassian.net/rest/api/2/search?jql=project=RES&maxResults=1000',
    'https://sta2020.atlassian.net/rest/api/2/search?jql=project=IT&maxResults=1000'
  ];

  Promise.all(urls.map(url=> 
      fetch(url, {  
            method: 'GET',
            headers: {
              'Authorization': `Basic ${Buffer.from(
                `tech_admin@scottishtecharmy.org:qSV1Uf9CJBM4NM3nl4ZX50F8`
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
            const ResData = json.issues.map(x => (
              {
                jobRole: x['fields'].customfield_10113,
                projectType: x['fields'].customfield_10112,
                suitableForBuddy: x['fields'].customfield_10108 ? x['fields'].customfield_10108.value : 'none'     
              }));

              const ItData = json.issues.map(x => (
                { 
                  projectName: x['fields'].summary, 
                  charityName: x['fields'].customfield_10027,  
                }));
            
            // writeToJsonFile(ResData);
            // writeToJsonFile(ItData);
            console.log(ResData);
            console.log(ItData);
          })))
          .catch(err => next(err));
});

  
app.listen(5000, function (req, res) {
  console.log("App running on port 5000");
});
