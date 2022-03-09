require('dotenv').config();

const express = require('express');
const router = express.Router();
const seedData = require('../data.json'); //dummy data for dev purposes if no authorised credentials
const axios = require('axios').default;
const app = express();
const api_key = process.env.API_KEY;
const email = process.env.EMAIL;
const resourcingJiraBoardName = 'RES';
const recruiterAssignedJiraColumnName = 'Recruiter Assigned';
const projectJiraBoardName = 'IT';
const volunteerSearch = 'Volunteer Search';
const volunteerIntroduction = 'Volunteer Introduction';
const activityUnderway = 'Activity Underway';


router.get('/', async (req, res, next) => {
  const ResArray = [];
  const ItArray = [];

  const callAllResData = Promise.resolve(jiraResourceDataCall(0));
  const callAllItData = Promise.resolve(jiraItDataCall(0));

  async function jiraResourceDataCall(startAt) {
    const resJqlQuery = encodeURIComponent(
      `project=${resourcingJiraBoardName} AND status="${recruiterAssignedJiraColumnName}"`,
    );
    const jiraRes = await axios.get(
      `https://sta2020.atlassian.net/rest/api/2/search?jql=${resJqlQuery}&startAt=${startAt}&maxResults=1000`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            // email address and API-key can be requested in the Volunteer App dev group
            `${email}:${api_key}`,
          ).toString('base64')}`,
          Accept: 'application/json',
        },
      },
    );

    const ResTotalData = parseInt(jiraRes.data.total);

    const ResourceDataDump = jiraRes.data.issues.map((x) =>
      ResArray.push({
        res_id: x['id'],
        it_related_field_id: x['fields'].customfield_10109,
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
    const itJqlQuery = encodeURIComponent(
      `project=${projectJiraBoardName} AND status="${volunteerSearch}" OR status="${volunteerIntroduction}" OR status="${activityUnderway}"`,
      );
    const jiraIt = await axios.get(
      `https://sta2020.atlassian.net/rest/api/2/search?jql=${itJqlQuery}&startAt=${ItstartAt}&maxResults=1000`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            // email address and API-key can be requested in the Volunteer App dev group
            `${email}:${api_key}`,
          ).toString('base64')}`,
          Accept: 'application/json',
        },
      },
    );

    const ItTotalData = parseInt(jiraIt.data.total);

    const ItData = jiraIt.data.issues.map((x) =>
        ItArray.push({
          it_key: x['key'],
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

  function linkData(ResArray, ItArray) {
    const FinalArray = [];
    for (let i = 0; i < ResArray.length; i++) {
      for (let j = 0; j < ItArray.length; j++) {
        for (const ResData in ResArray[i]) {
          for (const ItData in ItArray[j]) {
            if (ResArray[i][ResData] == ItArray[j][ItData]) {
              FinalArray.push({
                ResData: ResArray[i],
                ItData: ItArray[j]
              })
            }
            break;
          }
        }
      }
    }
    res.status(200).send(FinalArray);
  }

  Promise.all([callAllResData, callAllItData])
    .then(() => {
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
    return linkData(ResArray, ItArray);
    })
    // if unauthorised for Jira API access, load with dummy data
    .catch (error => {
      if (error.response.status === 401) {
        res.json(seedData)
      }
    });
});

router.get('/single', async (req, res, next) => {

  const singleRes = await axios.get(
    `https://sta2020.atlassian.net/rest/api/3/issue/${req.query.res}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          // below use email address you used for jira and generate token from jira
          `${email}:${api_key}`,
        ).toString('base64')}`,
        Accept: 'application/json',
      },
    },
  )

    const singleIt =  axios.get(
      `https://sta2020.atlassian.net/rest/api/3/issue/${req.query.it}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            // below use email address you used for jira and generate token from jira
            `${email}:${api_key}`,
          ).toString('base64')}`,
          Accept: 'application/json',
        },
      },
    )

 const [resResults, itResults] = await Promise.all([singleRes, singleIt])
  const project = {
        res_id: resResults.data.id,
        it_related_field_id: resResults.data.fields.customfield_10109,
        jobRole: resResults.data.fields.customfield_10113,
        projectType: resResults.data.fields.customfield_10112,
        suitableForBuddy: resResults.data.fields.customfield_10108.value ?? 'none',
        candidateTime: resResults.data.fields.customfield_10062 ?? 'none',
        candidateCoreSkills: resResults.data.fields.customfield_10061 ?? 'none',
        it_key: itResults.data.key,
        projectSummary: itResults.data.fields.description.content,
        projectName: resResults.data.fields.customfield_10060,
        charityName: itResults.data.fields.customfield_10027,
        charityVideo: itResults.data.fields.customfield_10159 ??'none',
      }

      res.json(project)
})

module.exports = router;