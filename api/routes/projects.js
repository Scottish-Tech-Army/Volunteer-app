const airTable = require('../helpers/airTable');
const dayjs = require('dayjs');
const express = require('express');
const slackService = require('../services/slack');
const projectsHelper = require('../helpers/projects');
const router = express.Router();
const routesHelper = require('../helpers/routes');

router.get('/', async (req, res) => await getAllProjectsHandler(req, res));

const getAllProjectsHandler = async (req, res) => {
  const projectsResources = await airTable.getAllRecords(airTable.projectsResourcesCacheTable());

  if (projectsResources && projectsResources.error) {
    routesHelper.sendError(
      res,
      `Database connection error: ${airTable.connectionErrorMessage()}`,
    );

    return;
  }

  if (!projectsResources?.length) {
    routesHelper.sendError(
      res,
      'Could not get projects from database',
    );

    return;
  }

  const projectsResourcesFormatted = projectsResources.map((projectResource) =>
    projectsHelper.formatProjectResourceFromAirTable(projectResource),
  );

  res.status(200).send(projectsResourcesFormatted);
};

router.get('/single', async (req, res) => {
  const projectItKey = req.query.it;
  const resourceId = req.query.res;

  const projectResource = await airTable.getRecordByQuery(airTable.projectsResourcesCacheTable(), {
    it_key: projectItKey,
    res_id: resourceId,
  });

  if (!projectResource || projectResource.error) {
    routesHelper.sendError(
      res,
      `Could not find project matching it_key ${projectItKey} and/or res_id ${resourceId} - please check these details are correct.  Please check database details are correct in the API .env file.`,
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
      `Could not find project matching it_key ${projectItKey} and/or res_id ${resourceId} - please check these details are correct.  Please check database details are correct in the API .env file.`,
    );

    return;
  }

  const projectResourceFormatted = projectsHelper.formatProjectResourceFromAirTable(projectResource);

  const dataExpected = ['availableFrom', 'email', 'firstName', 'lastName', 'lookingForPeerSupport'];

  const dataNotProvided = [];

  for (const dataItemExpected of dataExpected) {
    if (!req.body?.hasOwnProperty(dataItemExpected)) dataNotProvided.push(dataItemExpected);
  }

  if (dataNotProvided.length) {
    routesHelper.sendError(res, `These properties were missing from your request: ${dataNotProvided.join(', ')}`);

    return;
  }

  const fullName = `${req.body.firstName} ${req.body.lastName}`;

  const slackResponse = await slackService.postMessage(
    process.env.SLACK_CHANNEL_VOLUNTEER_PROJECT_INTEREST,
    `🎉🎉🎉 Hurray! We've got a new volunteer interested in *${projectResourceFormatted.name}* for *${projectResourceFormatted.client
    }*

    ➡️ *Role*  ${projectResourceFormatted.role}
    👤 *Volunteer*  ${fullName}
    ✉️ *Email*  ${req.body.email}
    🧑‍🤝‍🧑 *Looking for peer support?*  ${req.body.lookingForPeerSupport ? 'Yes' : 'No'}
    📅 *Available from*  ${dayjs(req.body.availableFrom, 'YYYY-MM-DD').format('D MMMM YYYY')}

    Please get in touch with them to follow up`,
  );

  const airTableCreateRecordSuccess = await airTable.createRecord(airTable.projectsRegisterInterestTable(), {
    'Name': fullName,
    'Create date': dayjs().format('YYYY-MM-DD'),
    'Available from': req.body.availableFrom,
    'Project name': projectResourceFormatted.name,
    'Role': projectResourceFormatted.role,
    'Peer Support': req.body.lookingForPeerSupport ? 'Yes' : 'No',
    'email': req.body.email,
  }, 'sta');

  res.status((slackResponse.data && airTableCreateRecordSuccess) ? 200 : 400).send(slackResponse);
};

module.exports = {
  getAllProjectsHandler,
  projectsApi: router,
  projectRegisterInterestHandler,
};
