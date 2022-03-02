require('dotenv').config();
const apiDefinition = require('../definitions/api_definition.json');
const AirTable = require('airtable');
const airTableClient = new AirTable().base(process.env.AIRTABLE_ID);
const axios = require('axios').default;
const api_key = process.env.API_KEY;
const email = process.env.EMAIL;
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const [projects, resources] = await Promise.all([
    getAllRecords(process.env.AIRTABLE_PROJECTS_CACHE_TABLE),
    getAllRecords(process.env.AIRTABLE_RESOURCES_CACHE_TABLE),
  ]);

  const projectResources = resources.map((resource) => {
    const project = projects.filter((project) => project.it_key === resource.it_key)[0];

    return formatProjectResourceFromAirTable({
      ...resource,
      ...project,
    });
  });

  res.status(200).send(projectResources);
});

function formatProjectResourceFromAirTable(projectResource) {
  const projectResourceFieldDefinitions = apiDefinition.components.schemas.project.items.properties;

  for (const [fieldName, fieldProperties] of Object.entries(projectResourceFieldDefinitions)) {
    // AirTable doesn't include properties that it sees as empty (including boolean false) so we need to populate them
    if (!projectResource[fieldName]) {
      switch (fieldProperties.type) {
        case 'boolean':
          projectResource[fieldName] = false;
          break;
        case 'string':
          projectResource[fieldName] = '';
          break;
      }
    }

    // Certain fields need to be formatted
    switch (fieldName) {
      case 'required':
        projectResource[fieldName] =
          projectResource[fieldName] === 1 ? '1 person' : `${projectResource[fieldName]} people`;
        break;
      case 'skills':
        projectResource[fieldName] = projectResource[fieldName]
          ? splitByLineBreak(removeBlankLines(projectResource[fieldName]))
          : [];
        break;
    }
  }

  return projectResource;
}

async function getAllRecords(tableName) {
  const allRecordsRaw = await airTableClient.table(tableName).select().all();

  return allRecordsRaw.map((record) => record.fields);
}

function removeBlankLines(string) {
  return string.replace(/(^[ \t]*\n)/gm, '');
}

function splitByLineBreak(string) {
  return string.split(/[\r\n]+/);
}

router.get('/single', async (req, res) => {
  const singleRes = await axios.get(`https://sta2020.atlassian.net/rest/api/3/issue/${req.query.res}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        // below use email address you used for jira and generate token from jira
        `${email}:${api_key}`,
      ).toString('base64')}`,
      Accept: 'application/json',
    },
  });

  const singleIt = axios.get(`https://sta2020.atlassian.net/rest/api/3/issue/${req.query.it}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        // below use email address you used for jira and generate token from jira
        `${email}:${api_key}`,
      ).toString('base64')}`,
      Accept: 'application/json',
    },
  });

  const [resResults, itResults] = await Promise.all([singleRes, singleIt]);
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
    charityVideo: itResults.data.fields.customfield_10159 ?? 'none',
  };

  res.json(project);
});

module.exports = router;
