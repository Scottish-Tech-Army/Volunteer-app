const airTable = require('../helpers/airTable')
const apiDefinition = require('../definitions/api_definition.json')

/* Takes an event with the fields as they have come from AirTable,
   and formats it correctly for the API to return it to the user */
function formatEventFromAirTable(event) {
  const eventFieldDefinitions =
    apiDefinition.components.schemas.event.items.properties

  const images = airTable.simplifyAttachmentsData(event.images)
  const video_thumbnails = airTable.simplifyAttachmentsData(
    event.video_thumbnail,
  )
  const video_thumbnail = video_thumbnails.length ? video_thumbnails[0] : ''

  const eventFormatted = airTable.addEmptyFields(
    {
      ...event,
      images,
      video_thumbnail,
    },
    eventFieldDefinitions,
  )

  eventFormatted.duration = airTable.formatDuration(eventFormatted.duration)
  eventFormatted.time = airTable.formatTime(eventFormatted.time)

  return eventFormatted
}

module.exports = {
  formatEventFromAirTable,
}
