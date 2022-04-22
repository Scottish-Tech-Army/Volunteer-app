const airTable = require('../helpers/airTable');
const express = require('express');
const projectsHelper = require('../helpers/projects');
const router = express.Router();
const seedData = require('../sample-data/projects.json'); //dummy data for dev purposes if no authorised credentials

router.get('/', async (req, res) => {
  const projectsResources = await airTable.getAllRecords(airTable.projectsResourcesCacheTable());

  /*
   * If unauthorised for AirTable API access, load with dummy data for now.
   * This is to help with rapid early development only and will need to be
   * removed before being used in a production environment
   */
  if (projectsResources.error) {
    console.error(
      '❌ Could not connect to AirTable - please check you have the correct details in your .env file.  Returning example results for now -- this is not real data.',
    );
    res.status(400).send(seedData);

    return;
  }

  const projectsResourcesFormatted = projectsResources.map((projectResource) => projectsHelper.formatProjectResourceFromAirTable(projectResource));

  res.status(200).send(projectsResourcesFormatted);
});

router.get('/single', async (req, res) => {
  const projectItKey = req.query.it;
  const resourceId = req.query.res;

  const projectResource = await airTable.getRecord(airTable.projectsResourcesCacheTable(), {
    it_key: projectItKey,
    res_id: resourceId,
  });

  /*
   * If unauthorised for AirTable API access, load with dummy data for now.
   * This is to help with rapid early development only and will need to be
   * removed before being used in a production environment
   */
  if (projectResource.error) {
    console.error(
      '❌ Could not connect to AirTable - please check you have the correct details in your .env file.  Returning example results for now -- this is not real data.',
    );
    const seedDataSingle = seedData[0];
    seedDataSingle.it_key = projectItKey;
    seedDataSingle.res_id = resourceId;
    res.status(200).send(seedDataSingle);

    return;
  }

  if (!projectResource) {
    const error = `Could not find project ${projectItKey} and/or resource ${resourceId}`;
    console.error(error);

    res.status(400).send({ error });

    return;
  }

  const projectResourceFormatted = projectsHelper.formatProjectResourceFromAirTable(projectResource);

  res.status(200).send(projectResourceFormatted);
});

router.post('/single/register-interest', async (req, res) => {
  const projectItKey = req.query.it;
  const resourceId = req.query.res;

  const projectResource = await airTable.getRecord(airTable.projectsResourcesCacheTable(), {
    it_key: projectItKey,
    res_id: resourceId,
  });

  if (!projectResource) {
    const error = `Could not find project ${projectItKey} and/or resource ${resourceId}`;
    console.error(error);

    res.status(400).send({ error });

    return;
  }

  const projectResourceFormatted = projectsHelper.formatProjectResourceFromAirTable(projectResource);
  
  const dataExpected = [
    'email',
    'firstName',
    'lastName',
    'happyToMentor',
    'lookingForBuddy',
  ];

  const dataNotProvided = [];

  for (const dataItemExpected of dataExpected) {
    if (!req.body?.hasOwnProperty(dataItemExpected))
      dataNotProvided.push(dataItemExpected);
  }

  if (dataNotProvided.length) {
    const error = `These properties were missing from your request: ${dataNotProvided.join(', ')}`;
    console.error(error);

    res.status(400).send({ error });

    return;
  }

  // Send payload to Slack
  // If there's an error, log it and do 400 response with error message
  // If successful do 200 response

  res.status(200).send({ status: 'success' });
});

module.exports = router;
