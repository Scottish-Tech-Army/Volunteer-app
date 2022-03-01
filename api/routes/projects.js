require('dotenv').config();
const apiDefinition = require('../definitions/api_definition.json');
const AirTable = require('airtable');
const airTableClient = new AirTable().base(process.env.AIRTABLE_ID);
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
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

module.exports = router;
