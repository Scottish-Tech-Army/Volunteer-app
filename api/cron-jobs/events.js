// Get video thumbnails and MP4 video files for event videos

require('dotenv').config();
const axios = require('axios').default;
const airTable = require('../helpers/airTable');
const eventsHelper = require('../helpers/events');
const logging = require('../services/logging');
const vimeoService = require('../services/vimeo');
const timing = require('../util/timing');

// Add thumbnails to any events that have a video but don't yet have a thumbnail
// We save the image itself to AirTable, so this doesn't need refreshing later
async function addEventsVideoThumbnails(events) {
  const eventsNeedingVideoThumbnailAdded = events.filter((event) => event.video_webpage && !event.video_thumbnail);
  console.log(
    `🛈 ${eventsNeedingVideoThumbnailAdded.length} of ${events.length} events have a video and need a video thumbnail added`,
  );

  for (const event of eventsNeedingVideoThumbnailAdded) {
    const video_thumbnail = await vimeoService.getVideoThumbnail(event.video_webpage);

    if (video_thumbnail) {
      const updateRecordResult = await airTable.updateRecordById(airTable.eventsTable(), event.id, {
        video_thumbnail: [
          {
            url: video_thumbnail,
          },
        ],
      });

      if (updateRecordResult.error) {
        logging.logError(`❌ Could not update event record in AirTable for event ${event.name} (${event.id})`, {
          extraInfo: updateRecordResult.error,
        });
      } else {
        console.log(`✅ Added video thumbnail for event ${event.name} (${event.id})`);
      }
    }

    await timing.delay(1000); // wait for 1 second, in case we are calling Vimeo's API multiple times we don't want to hit a rate limit
  }
}

async function getAllEvents() {
  const events = await airTable.getAllRecords(airTable.eventsTable(), true);

  if (events.error) {
    logging.logError('❌ Could not get events from AirTable', {
      extraInfo: events.error,
    });

    return;
  }

  const eventsFormatted = events.map((event) => eventsHelper.formatEventFromAirTable(event));

  return eventsFormatted;
}

// Begin the steps to get thumbnail images for events that don't already have them
async function startGettingNewVideoThumbnails() {
  console.log(`🚀 Started getting new thumbnails for event videos at ${new Date()}`);

  const events = await module.exports.getAllEvents();

  await module.exports.addEventsVideoThumbnails(events);

  console.log('🏁 Complete!');
}

module.exports = {
  addEventsVideoThumbnails,
  getAllEvents,
  startGettingNewVideoThumbnails,
};
