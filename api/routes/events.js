import { getRecordById, eventsTable, eventsTableLinkedFields, getAllRecords, connectionErrorMessage } from '../helpers/airTable';
import dayjs from 'dayjs';
import { formatEventFromAirTable } from '../helpers/events';
import { Router } from 'express';
const router = Router();
import { sendError } from '../helpers/routes';

router.get('/:id', async (req, res) => getEventHandler(req, res));

const getEventHandler = async (req, res) => {
  const event = await getRecordById(eventsTable(), req.params.id, eventsTableLinkedFields());

  if (!event || event.error) {
    sendError(
      res,
      `❌ Could not find event with ID ${req.params.id}. Please check the ID and check your AirTable details are correct in your .env file.`,
    );

    return;
  }

  const eventFormatted = formatEventFromAirTable(event);

  res.status(200).send(eventFormatted);
};

// :schedule value can be 'past' or 'upcoming'
router.get('/schedule/:schedule', async (req, res) => getScheduledEventsHandler(req, res));

const getScheduledEventsHandler = async (req, res) => {
  const allEvents = await getAllRecords(eventsTable(), true, eventsTableLinkedFields());

  if (allEvents.error) {
    sendError(res, connectionErrorMessage());

    return;
  }

  const allEventsFormatted = allEvents.map((event) => formatEventFromAirTable(event));

  const now = dayjs();

  if (req.params.schedule === 'past') {
    const pastEvents = allEventsFormatted
      .filter((event) => dayjs(`${event.date} ${event.time}`, 'YYYY-MM-DD HH:mm').isBefore(now))
      .sort((a, b) => (dayjs(a.date, 'YYYY-MM-DD').isAfter(b.date, 'YYYY-MM-DD') ? -1 : 1));

    res.status(200).send(pastEvents);
  } else if (req.params.schedule === 'upcoming') {
    const upcomingEvents = allEventsFormatted
      .filter((event) => dayjs(`${event.date} ${event.time}`, 'YYYY-MM-DD HH:mm').isAfter(now))
      .sort((a, b) => (dayjs(a.date, 'YYYY-MM-DD').isBefore(b.date, 'YYYY-MM-DD') ? -1 : 1));

    res.status(200).send(upcomingEvents);
  } else {
    sendError(
      res,
      `❌ You did not specify a valid final part of the URL - it must be /events/schedule/past or /events/schedule/upcoming, you requested /events/schedule/${req.params.schedule}`,
    );
  }
};

router.get('/', async (req, res) => await getEventsHandler(req, res));

const getEventsHandler = async (req, res) => {
  const allEvents = await getAllRecords(eventsTable(), true, eventsTableLinkedFields());

  if (allEvents.error) {
    sendError(res, connectionErrorMessage());

    return;
  }

  const allEventsFormatted = allEvents.map((event) => formatEventFromAirTable(event));

  res.status(200).send(allEventsFormatted);
};

export default {
  eventsApi: router,
  getEventHandler,
  getEventsHandler,
  getScheduledEventsHandler,
};
