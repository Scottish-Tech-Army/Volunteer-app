const airTable = require('../helpers/airTable');
const dayjs = require('dayjs');
const eventsHelper = require('../helpers/events');
const express = require('express');
const router = express.Router();
const routesHelper = require('../helpers/routes');
const Airtable = require('airtable');

router.get('/:id', async (req, res) => getEventHandler(req, res));

// TODO: remove hardcoding because it is used twice in this file to a function that returns an array
// TODO: tableName should go in the .env and .env.example files, look at airtable.events table, do something similar

const getLinkedFields = (field, table) =>
  [{
    fieldName: field,
    tableName: table,
  }]

const getEventHandler = async (req, res) => {
  // need to find a way to not hard code the 'speakers'
  const event = await airTable.getRecordById(airTable.eventsTable(), req.params.id, getLinkedFields('speakers', 'STA Events Test'));
  
  if (!event || event.error) {
    routesHelper.sendError(
      res,
      `❌ Could not find event with ID ${req.params.id}. Please check the ID and check your AirTable details are correct in your .env file.`,
    );

    return;
  }

  const eventFormatted = eventsHelper.formatEventFromAirTable(event);

  res.status(200).send(eventFormatted);
};

// :schedule value can be 'past' or 'upcoming'
router.get('/schedule/:schedule', async (req, res) => getScheduledEventsHandler(req, res));

// TODO: pass in linkedFields param any time we use getAllRecords in this file
const getScheduledEventsHandler = async (req, res) => {
  let allEvents = await airTable.getAllRecords(airTable.eventsTable(), true, getLinkedFields('speakers', airTable.speakersTable()));
  console.log(allEvents)

  allEvents = allEvents.map((event) => eventsHelper.formatEventFromAirTable(event));

  if (allEvents.error) {
    routesHelper.sendError(res, airTable.connectionErrorMessage());

    return;
  }

  const now = dayjs();

  if (req.params.schedule === 'past') {
    const pastEvents = allEvents
      .filter((event) => dayjs(`${event.date} ${event.time}`, 'YYYY-MM-DD HH:mm').isBefore(now))
      .sort((a, b) => (dayjs(a.date, 'YYYY-MM-DD').isAfter(b.date, 'YYYY-MM-DD') ? -1 : 1));

    res.status(200).send(pastEvents);
  } else if (req.params.schedule === 'upcoming') {
    const upcomingEvents = allEvents
      .filter((event) => dayjs(`${event.date} ${event.time}`, 'YYYY-MM-DD HH:mm').isAfter(now))
      .sort((a, b) => (dayjs(a.date, 'YYYY-MM-DD').isBefore(b.date, 'YYYY-MM-DD') ? -1 : 1));

    res.status(200).send(upcomingEvents);
  } else {
    routesHelper.sendError(
      res,
      `❌ You did not specify a valid final part of the URL - it must be /events/schedule/past or /events/schedule/upcoming, you requested /events/schedule/${req.params.schedule}`,
    );
  }
};

router.get('/', async (req, res) => await getEventsHandler(req, res));

const getEventsHandler = async (req, res) => {
  const events = await airTable.getAllRecords(airTable.eventsTable());

  if (events.error) {
    routesHelper.sendError(res, airTable.connectionErrorMessage());

    return;
  }

  const eventsFormatted = events.map((event) => eventsHelper.formatEventFromAirTable(event));

  res.status(200).send(eventsFormatted);
};

module.exports = {
  eventsApi: router,
  getEventHandler,
  getEventsHandler,
  getScheduledEventsHandler,
  getLinkedFields,
};
