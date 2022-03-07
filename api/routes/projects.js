const airTable = require('../helpers/airTable');
const projectsHelper = require('../helpers/projects');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const [projects, resources] = await Promise.all([
    airTable.getAllRecords(airTable.projectsCacheTable()),
    airTable.getAllRecords(airTable.resourcesCacheTable()),
  ]);

  const projectResources = resources.map((resource) => {
    const project = projects.filter((project) => project.it_key === resource.it_key)[0];

    return projectsHelper.formatProjectResourceFromAirTable({
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
    airTable.getRecord(airTable.projectsCacheTable(), 'it_key', projectItKey),
    airTable.getRecord(airTable.resourcesCacheTable(), 'res_id', resourceId),
  ]);

  if (!project || !resource) {
    const error = `Could not find project ${projectItKey} and/or resource ${resourceId}`;
    console.error(error);

    res.status(204).send({ error });
  }

  const projectResource = projectsHelper.formatProjectResourceFromAirTable({
    ...resource,
    ...project,
  });

  res.status(200).send(projectResource);
});

module.exports = router;
