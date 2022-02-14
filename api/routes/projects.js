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
    return linkData(ResArray, ItArray);
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
  // .then((resData) => {

  //   project = {
  //     res_id: resData.data['id'],
  //     it_related_field_id: resData.data['fields'].customfield_10109,
  //     jobRole: resData.data['fields'].customfield_10113,
  //     projectType: resData.data['fields'].customfield_10112,
  //     suitableForBuddy: resData.data['fields'].customfield_10108 ? resData.data['fields'].customfield_10108.value : 'none',
  //     candidateTime: resData.data['fields'].customfield_10062 ? resData.data['fields'].customfield_10062 : 'none',
  //     candidateCoreSkills: resData.data['fields'].customfield_10061 ? resData.data['fields'].customfield_10061 : 'none',
  //   }
 
  // }).then(() => {
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
    // console.log(singleIt);
  // }).then((itData) => {
  //   // console.log(itData);
  //   // project.it_key = itData.data['key'];
  //   // project.projectName = itData.data['fields'].summary;
  //   // project.charityName = itData.data['fields'].customfield_10027;
  //   // project.charityVideo = itData.data['fields'].customfield_10159 ? itData.data['fields'].customfield_10159 : 'none';
  // })
  //   res.status(200).json(project)

 const [resResults, itResults] = await Promise.all([singleRes, singleIt])
  const project = {
        res_id: resResults.data.id,
        it_related_field_id: resResults.data.fields.customfield_10109,
        jobRole: resResults.data.fields.customfield_10113,
        projectType: resResults.data.fields.customfield_10112,
        suitableForBuddy: resResults.data.fields.customfield_10108 ? resResults.data.fields.customfield_10108.value : 'none',
        candidateTime: resResults.data.fields.customfield_10062 ? resResults.data.fields.customfield_10062 : 'none',
        candidateCoreSkills: resResults.data.fields.customfield_10061 ? resResults.data.fields.customfield_10061 : 'none',
        it_key: itResults.data.key,
        projectSummary: itResults.data.fields.description.content,
        projectName: resResults.data.fields.customfield_10060,
        charityName: itResults.data.fields.customfield_10027,
        charityVideo: itResults.data.fields.customfield_10159 ? itResults.data.fields.customfield_10159 : 'none',
  // })
      }

      res.json(project)
})

module.exports = router;