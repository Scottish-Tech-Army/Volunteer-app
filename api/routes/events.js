const airTable = require('../helpers/airTable')
const dayjs = require('dayjs')
const eventsHelper = require('../helpers/events')
const express = require('express')
const router = express.Router()
const routesHelper = require('../helpers/routes')

router.get('/:id', async (req, res) => getEventHandler(req, res))

const getEventHandler = async (req, res) => {
  const event = await airTable.getRecordById(
    airTable.eventsTable(),
    req.params.id,
    airTable.eventsTableLinkedFields(),
  )

  if (!event || event.error) {
    routesHelper.sendError(
      res,
      `❌ Could not find event with ID ${req.params.id}. Please check the ID and check your AirTable details are correct in your .env file.`,
    )

    return
  }

  const eventFormatted = eventsHelper.formatEventFromAirTable(event)

  res.status(200).send(eventFormatted)
}

// :schedule value can be 'past' or 'upcoming'
router.get('/schedule/:schedule', async (req, res) =>
  getScheduledEventsHandler(req, res),
)

const getScheduledEventsHandler = async (req, res) => {
  const allEvents = await airTable.getAllRecords(
    airTable.eventsTable(),
    true,
    airTable.eventsTableLinkedFields(),
  )

  if (allEvents.error) {
    routesHelper.sendError(res, airTable.connectionErrorMessage())

    return
  }

  const allEventsFormatted = allEvents.map(event =>
    eventsHelper.formatEventFromAirTable(event),
  )

  const now = dayjs()

  if (req.params.schedule === 'past') {
    const pastEvents = allEventsFormatted
      .filter(event =>
        dayjs(`${event.date} ${event.time}`, 'YYYY-MM-DD HH:mm').isBefore(now),
      )
      .sort((a, b) =>
        dayjs(a.date, 'YYYY-MM-DD').isAfter(b.date, 'YYYY-MM-DD') ? -1 : 1,
      )

    res.status(200).send(pastEvents)
  } else if (req.params.schedule === 'upcoming') {
    const upcomingEvents = allEventsFormatted
      .filter(event =>
        dayjs(`${event.date} ${event.time}`, 'YYYY-MM-DD HH:mm').isAfter(now),
      )
      .sort((a, b) =>
        dayjs(a.date, 'YYYY-MM-DD').isBefore(b.date, 'YYYY-MM-DD') ? -1 : 1,
      )

    res.status(200).send(upcomingEvents)
  } else {
    routesHelper.sendError(
      res,
      `❌ You did not specify a valid final part of the URL - it must be /events/schedule/past or /events/schedule/upcoming, you requested /events/schedule/${req.params.schedule}`,
    )
  }
}

router.get('/', async (req, res) => await getEventsHandler(req, res))

const getEventsHandler = async (req, res) => {
  const allEvents = await airTable.getAllRecords(
    airTable.eventsTable(),
    true,
    airTable.eventsTableLinkedFields(),
  )

  if (allEvents.error) {
    routesHelper.sendError(res, airTable.connectionErrorMessage())

    return
  }

  const allEventsFormatted = allEvents.map(event =>
    eventsHelper.formatEventFromAirTable(event),
  )

  res.status(200).send(allEventsFormatted)
}

module.exports = {
  eventsApi: router,
  getEventHandler,
  getEventsHandler,
  getScheduledEventsHandler,
}
