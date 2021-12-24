const express = require('express');
const router = express.Router();
const data = require('../data.json');
const axios = require('axios').default;


router.get('/', (req, res, next) => {
    const fetchAll = async(u) => {
       axios(u, {
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
        const dataArray = []
          if (json.data.issues[0]['key'].search('RES') > -1) {
           
            const ResData = json.data.issues.map(x => (
            dataArray.push( {
                res_id: x['id'],
                  jobRole: x['fields'].customfield_10113,
                  projectType: x['fields'].customfield_10112,
                  suitableForBuddy: x['fields'].customfield_10108 ? x['fields'].customfield_10108.value : 'none',
                  candidateTime: x['fields'].customfield_10062 ? x['fields'].customfield_10062 : 'none',
                  candidateCoreSkills: x['fields'].customfield_10061 ? x['fields'].customfield_10061 : 'none'    
              })));
              
          } else if(json.data.issues[0]['key'].search('IT') > -1){

            const ItData = json.data.issues.map(x => (
            dataArray.push( { 
                it_id: x['id'],
                projectName: x['fields'].summary, 
                charityName: x['fields'].customfield_10027,  
                charityVideo: x['fields'].customfield_10159 ? x['fields'].customfield_10159 : 'none'
              })));
          }
          return res.json(dataArray);
    
        })
        .catch(err => next(err));

      } 

const path = ['https://sta2020.atlassian.net/rest/api/2/search?jql=project=RES&startAt=101&maxResults=1000',
            'https://sta2020.atlassian.net/rest/api/2/search?jql=project=IT&startAt=101&maxResults=1000'];

path.forEach(fetchAll);

});

module.exports = router;