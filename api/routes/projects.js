const airTable = require('../helpers/airTable');
const express = require('express');
const projectsHelper = require('../helpers/projects');
const router = express.Router();
const seedData = require('../sample-data/projects.json'); //dummy data for dev purposes if no authorised credentials

router.get('/', async (req, res) => {
  const [projects, resources] = await Promise.all([
    airTable.getAllRecords(airTable.projectsCacheTable()),
    airTable.getAllRecords(airTable.resourcesCacheTable()),
  ]);

  /*
   * If unauthorised for AirTable API access, load with dummy data for now.
   * This is to help with rapid early development only and will need to be
   * removed before being used in a production environment
   */
  if (projects.error || resources.error) {
    console.error(
      'Could not connect to AirTable - please check you have the correct details in your .env file.  Returning example results for now -- this is not real data.',
    );
    res.status(200).send(seedData);

    return;
  }

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

  /*
   * If unauthorised for AirTable API access, load with dummy data for now.
   * This is to help with rapid early development only and will need to be
   * removed before being used in a production environment
   */
  if (project.error || resource.error) {
    console.error(
      'Could not connect to AirTable - please check you have the correct details in your .env file.  Returning example results for now -- this is not real data.',
    );
    const seedDataSingle = seedData[0];
    seedDataSingle.it_key = projectItKey;
    seedDataSingle.res_id = resourceId;
    res.status(200).send(seedDataSingle);

    return;
  }

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
