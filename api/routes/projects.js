require('dotenv').config();

const express = require('express');
const router = express.Router();
const data = require('../data.json');
const axios = require('axios').default;
const app = express();
const api_key = process.env.API_KEY;
const email = process.env.EMAIL;
const resourcingJiraBoardName = 'RES';
const recruiterAssignedJiraColumnName = 'Recruiter Assigned';

// axios.defaults.baseURL= 'https://sta2020.atlassian.net/rest/api/2/search?jql=project='
router.get('/', async (req, res, next) => {
  const ResArray = [];
  const ItArray = [];

  const callAllResData = Promise.resolve(jiraResourceDataCall(0));
  const callAllItData = Promise.resolve(jiraItDataCall(0));

  async function jiraResourceDataCall(startAt) {
    const jqlQuery = encodeURIComponent(
      `project=${resourcingJiraBoardName} AND status="${recruiterAssignedJiraColumnName}"`,
    );
    const jiraRes = await axios.get(
      `https://sta2020.atlassian.net/rest/api/2/search?jql=${jqlQuery}&startAt=${startAt}&maxResults=1000`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            // below use email address you used for jira and generate token from jira
            `${email}:${api_key}`,
          ).toString('base64')}`,
          Accept: 'application/json',
        },
      },
    );

    console.log(jiraRes.data.issues[0], jiraRes.data.issues[0].fields);

    let ResTotalData = parseInt(jiraRes.data.total);

    const ResourceDataDump = jiraRes.data.issues.map((x) =>
      ResArray.push({
        res_id: x['id'],
        jobRole: x['fields'].customfield_10113,
        projectType: x['fields'].customfield_10112,
        suitableForBuddy: x['fields'].customfield_10108 ? x['fields'].customfield_10108.value : 'none',
        candidateTime: x['fields'].customfield_10062 ? x['fields'].customfield_10062 : 'none',
        candidateCoreSkills: x['fields'].customfield_10061 ? x['fields'].customfield_10061 : 'none',
      }),
    );

    if (ResArray.length < ResTotalData) {
      let ResStartResultSearch = ResArray.length;
      return jiraResourceDataCall(ResStartResultSearch);
    }
    return;
  }

  async function jiraItDataCall(ItstartAt) {
    const jiraIt = await axios.get(
      `https://sta2020.atlassian.net/rest/api/2/search?jql=project=IT&startAt=${ItstartAt}&maxResults=1000`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            // below use email address you used for jira and generate token from jira
            `${email}:${api_key}`,
          ).toString('base64')}`,
          Accept: 'application/json',
        },
      },
    );

    let ItTotalData = parseInt(jiraIt.data.total);

    const ItData = jiraIt.data.issues.map((x) =>
      ItArray.push({
        it_id: x['id'],
        projectName: x['fields'].summary,
        charityName: x['fields'].customfield_10027,
        charityVideo: x['fields'].customfield_10159 ? x['fields'].customfield_10159 : 'none',
      }),
    );
    if (ItArray.length < ItTotalData) {
      let ItStartResultSearch = ItArray.length;
      return jiraItDataCall(ItStartResultSearch);
    }
    return;
  }
  Promise.all([callAllResData, callAllItData]).then(() => {
    const final = {
      jiraResBoard: {
        'number of results': ResArray.length,
        data: ResArray,
      },
      jiraItBoard: {
        'number of results': ItArray.length,
        data: ItArray,
      },
    };
    res.status(200).send(final);
  });
});

module.exports = router;
