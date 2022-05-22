const airTable = require('../helpers/airTable');
const dayjs = require('dayjs');
const express = require('express');
const slackService = require('../services/slack');
const projectsHelper = require('../helpers/projects');
const router = express.Router();
const routesHelper = require('../helpers/routes');
const seedData = require('../sample-data/projects.json'); //dummy data for dev purposes if no authorised credentials

router.get('/', async (req, res) => {
  const projectsResources = await airTable.getAllRecords(airTable.projectsResourcesCacheTable());

  /*
   * If unauthorised for AirTable API access, load with dummy data for now.
   * This is to help with rapid early development only and will need to be
   * removed before being used in a production environment
   */
  if (projectsResources.error) {
    routesHelper.sendError(
      res,
      `${airTable.connectionErrorMessage()} Returning example results for now -- this is not real data.`,
      seedData,
    );

    return;
  }

  const projectsResourcesFormatted = projectsResources.map((projectResource) =>
    projectsHelper.formatProjectResourceFromAirTable(projectResource),
  );

  res.status(200).send(projectsResourcesFormatted);
});

router.get('/single', async (req, res) => {
  const projectItKey = req.query.it;
  const resourceId = req.query.res;

  const projectResource = await airTable.getRecordByQuery(airTable.projectsResourcesCacheTable(), {
    it_key: projectItKey,
    res_id: resourceId,
  });

  /*
   * If unauthorised for AirTable API access, load with dummy data for now.
   * This is to help with rapid early development only and will need to be
   * removed before being used in a production environment
   */
  if (!projectResource || projectResource.error) {
    routesHelper.sendError(
      res,
      `❌ Could not find project ${projectItKey} and/or resource ${resourceId}. Please check these details are correct and check your AirTable details are correct in your .env file.  Returning example results for now -- this is not real data.`,
      seedDataSingle,
    );

    return;
  }

  const projectResourceFormatted = projectsHelper.formatProjectResourceFromAirTable(projectResource);

  res.status(200).send(projectResourceFormatted);
});

/*
 * TODO: When authentication has been set up, we need to:
 *  - Protect this API route, by only allowing requests from authenticated users (otherwise anyone who knows this route exists can post messages to the inital triage Slack channel)
 *  - Get the user's name and email from their user record instead
 *  - Save in a database that this user has expressed interest in this project
 *
 */
router.post('/single/register-interest', async (req, res) => await projectRegisterInterestHandler(req, res));

const projectRegisterInterestHandler = async (req, res) => {
  const projectItKey = req.query.it;
  const resourceId = req.query.res;

  const projectResource = await airTable.getRecordByQuery(airTable.projectsResourcesCacheTable(), {
    it_key: projectItKey,
    res_id: resourceId,
  });

  if (!projectResource || projectResource.error) {
    routesHelper.sendError(
      res,
      `❌ Could not find project ${projectItKey} and/or resource ${resourceId}. Please check these details are correct and check your AirTable details are correct in your .env file.  Returning example results for now -- this is not real data.`,
    );

    return;
  }

  const projectResourceFormatted = projectsHelper.formatProjectResourceFromAirTable(projectResource);

  const dataExpected = ['availableFrom', 'email', 'firstName', 'lastName', 'happyToMentor', 'lookingForBuddy'];

  const dataNotProvided = [];

  for (const dataItemExpected of dataExpected) {
    if (!req.body?.hasOwnProperty(dataItemExpected)) dataNotProvided.push(dataItemExpected);
  }

  if (dataNotProvided.length) {
    routesHelper.sendError(res, `These properties were missing from your request: ${dataNotProvided.join(', ')}`);

    return;
  }

  const slackResponse = await slackService.postMessage(
    process.env.SLACK_CHANNEL_VOLUNTEER_PROJECT_INTEREST,
    `🎉🎉🎉 Hurray! We've got a new volunteer interested in *${projectResourceFormatted.name}* for *${
      projectResourceFormatted.client
    }*

    ➡️ *Role*  ${projectResourceFormatted.role}
    👤 *Volunteer*  ${req.body.firstName} ${req.body.lastName}
    ✉️ *Email*  ${req.body.email}
    🎓 *Happy to mentor?*  ${req.body.happyToMentor ? 'Yes' : 'No'}
    🧑‍🤝‍🧑 *Looking for a buddy?*  ${req.body.lookingForBuddy ? 'Yes' : 'No'}
    📅 *Available from*  ${dayjs(req.body.availableFrom, 'YYYY-MM-DD').format('D MMMM YYYY')}

    Please get in touch with them to follow up`,
  );

  res.status(slackResponse.data ? 200 : 400).send(slackResponse);
};

module.exports = {
  projectsApi: router,
  projectRegisterInterestHandler,
};
