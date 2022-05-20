const airTable = require('../helpers/airTable');
const apiDefinition = require('../definitions/api_definition.json');

/* Takes an event with the fields as they have come from AirTable,
   and formats it correctly for the API to return it to the user */
function formatEventFromAirTable(event) {
  const eventFieldDefinitions = apiDefinition.components.schemas.event.items.properties;

  const images = event.images?.length ? event.images.map((airTableImageObject) => airTableImageObject.url) : [];

  const eventFormatted = airTable.addEmptyFields(
    {
      ...event,
      images,
    },
    eventFieldDefinitions,
  );

  eventFormatted.duration = airTable.formatDuration(eventFormatted.duration);
  eventFormatted.time = airTable.formatTime(eventFormatted.time);

  return eventFormatted;
}

module.exports = {
  formatEventFromAirTable,
};
