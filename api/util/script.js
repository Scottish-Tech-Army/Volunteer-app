import express from "express";
import fetch from "node-fetch";
import dotenv from 'dotenv';
import { writeToJsonFile } from '../js/writeToJsonFile.js';
dotenv.config();

const app = express();
const api_key = process.env.JIRA_API_KEY;
const email = process.env.JIRA_EMAIL;

app.get("/", function (req, res, next) {
  
  // async function fetchAll(u) {
   const fetchAll = async(u) => {
          const responses = await fetch(u, {
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
            console.log(`startAt: ${json.startAt}`);
            console.log(`maxResults: ${json.maxResults}`);
            console.log(`total: ${json.total}`);
            if (json.issues[0]['key'].search('RES') > -1) {

              const ResData = json.issues.map(x => (
                {
                  id: x['id'],
                  jobRole: x['fields'].customfield_10113,
                  projectType: x['fields'].customfield_10112,
                  suitableForBuddy: x['fields'].customfield_10108 ? x['fields'].customfield_10108.value : 'none'     
                }));
              return Promise.resolve(ResData);
            } else if(json.issues[0]['key'].search('IT') > -1){

              const ItData = json.issues.map(x => (
                { 
                  id: x['id'],
                  projectName: x['fields'].summary, 
                  charityName: x['fields'].customfield_10027,  
                }));
              return Promise.resolve(ItData);
            }
            // writeToJsonFile( ResData  );
            // console.log(ResData);
            // res.json(json)
          })
          .catch(err => next(err));

          console.log(responses);
        }


const path = ['https://sta2020.atlassian.net/rest/api/2/search?jql=project=RES&startAt=101&maxResults=1000',
              'https://sta2020.atlassian.net/rest/api/2/search?jql=project=IT&startAt=101&maxResults=1000'];

path.forEach(fetchAll);
    // fetchAll(path);

});

app.listen(5001, function (req, res) {
  console.log("App running on port 5001");
});
