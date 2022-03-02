const apiDefinition = require('../definitions/api_definition.json');
const airTable = require('../helpers/airTable');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const [projects, resources] = await Promise.all([
    getAllRecords(airTable.projectsCacheTable),
    getAllRecords(airTable.resourcesCacheTable),
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

router.get('/single', async (req, res) => {
  const projectItKey = req.query.it;
  const resourceId = req.query.res;

  const [project, resource] = await Promise.all([
    getRecord(airTable.projectsCacheTable, 'it_key', projectItKey),
    getRecord(airTable.resourcesCacheTable, 'res_id', resourceId),
  ]);

  if (!project || !resource) {
    const error = `Could not find project ${projectItKey} and/or resource ${resourceId}`;
    console.error(error);

    res.status(204).send({ error });
  }

  const projectResource = formatProjectResourceFromAirTable({
    ...resource,
    ...project,
  });

  res.status(200).send(projectResource);
});

function formatProjectResourceFromAirTable(projectResource) {
  const projectResourceFieldDefinitions = apiDefinition.components.schemas.project.items.properties;

  for (const [fieldName, fieldProperties] of Object.entries(projectResourceFieldDefinitions)) {
    // AirTable doesn't include fields that it sees as empty (including its equivalent of boolean false) so we need to populate them
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
        // For now, assumption based on available data is that skills are in separate paragraphs in a text field
        projectResource[fieldName] = projectResource[fieldName]
          ? splitByLineBreak(removeBlankLines(projectResource[fieldName]))
          : [];
        break;
    }
  }

  return projectResource;
}

async function getAllRecords(tableName) {
  const allRecordsRaw = await airTable.client.table(tableName).select().all();

  return allRecordsRaw.map((record) => record.fields);
}

async function getRecord(tableName, fieldName, fieldValue) {
  const recordsRaw = await airTable.client
    .table(tableName)
    .select({
      filterByFormula: `{${fieldName}} = '${fieldValue}'`,
    })
    .all();

  return recordsRaw.length ? recordsRaw[0].fields : undefined;
}

function removeBlankLines(string) {
  return string.replace(/(^[ \t]*\n)/gm, '');
}

function splitByLineBreak(string) {
  return string.split(/[\r\n]+/);
}

module.exports = router;
