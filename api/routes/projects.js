require('dotenv').config();

const express = require('express');
const router = express.Router();
const data = require('../data.json');
const axios = require('axios').default;
const app = express();
const api_key = process.env.API_KEY;
const email = process.env.EMAIL;


// axios.defaults.baseURL= 'https://sta2020.atlassian.net/rest/api/2/search?jql=project='

router.get('/', async (req, res, next) =>  {
  const ResArray = []
  const ITArray = []
  const ResGet = await axios('https://sta2020.atlassian.net/rest/api/2/search?jql=project=RES&startAt=101&maxResults=1000', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        // below use email address you used for jira and generate token from jira
        `${email}:${api_key}`
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  })
  .then (json => {
    const ResData = json.data.issues.map(x => (
      ResArray.push( {
          res_id: x['id'],
            jobRole: x['fields'].customfield_10113,
            projectType: x['fields'].customfield_10112,
            suitableForBuddy: x['fields'].customfield_10108 ? x['fields'].customfield_10108.value : 'none',
            candidateTime: x['fields'].customfield_10062 ? x['fields'].customfield_10062 : 'none',
            candidateCoreSkills: x['fields'].customfield_10061 ? x['fields'].customfield_10061 : 'none'    
        })));
        res.status(200)
   })
 .then (data => {
  axios('https://sta2020.atlassian.net/rest/api/2/search?jql=project=IT&startAt=101&maxResults=1000', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        // below use email address you used for jira and generate token from jira
        `${email}:${api_key}`
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  })
  .then(json => {
    const ItData = json.data.issues.map(x => (
      ITArray.push( { 
          it_id: x['id'],
          projectName: x['fields'].summary, 
          charityName: x['fields'].customfield_10027,  
          charityVideo: x['fields'].customfield_10159 ? x['fields'].customfield_10159 : 'none'
        })));
        
 })
 .then(() => {
  let final = {'res': ResArray, 'it' : ITArray}
   res.status(200).send(final)
 })
 }) 
})

module.exports = router;