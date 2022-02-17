require('dotenv').config();
const express = require('express');
const router = express.Router();
const AirTable = require('airtable');
const airTableClient = new AirTable().base(process.env.AIRTABLE_ID);

router.get('/', async (req, res, next) => {
  const [projects, resources] = await Promise.all([
    getAllRecords(process.env.AIRTABLE_PROJECTS_CACHE_TABLE),
    getAllRecords(process.env.AIRTABLE_RESOURCES_CACHE_TABLE),
  ]);

  const projectResources = resources.map((resource) => {
    const project = projects.filter((project) => project.it_key === resource.it_key)[0];

    const projectResource = {
      ...resource,
      ...project,
    };

    // TODO: move all of this formatting stuff into a separate function so is more easily testable
    // TODO: check for existence of all boolean properties, using API definition JSON
    projectResource.buddying = Boolean(projectResource.buddying);
    // TODO: check for existence of all string properties, using API definition JSON
    if (!projectResource.hasOwnProperty('video')) projectResource.video = '';
    projectResource.required = projectResource.required === 1 ? '1 person' : `${projectResource.required} people`;
    projectResource.skills = splitByLineBreak(removeBlankLines(projectResource.skills));

    return projectResource;
  });

  res.status(200).send(projectResources);
});

const removeBlankLines = (string) => {
  return string.replace(/(^[ \t]*\n)/gm, '');
};

const splitByLineBreak = (string) => {
  return string.split(/[\r\n]+/);
};

const getAllRecords = async (tableName) => {
  const allRecordsRaw = await airTableClient.table(tableName).select().all();

  return allRecordsRaw.map((record) => record.fields);
};

module.exports = router;
