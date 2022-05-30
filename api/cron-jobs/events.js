// Get a video thumbnail for an event video

require('dotenv').config();
const axios = require('axios').default;
const airTable = require('../helpers/airTable');
const eventsHelper = require('../helpers/events');
const timing = require('../util/timing');

async function addEventsVideoThumbnailIfNeeded(events) {
  const eventsNeedingVideoThumbnailAdded = events.filter((event) => event.video && !event.video_thumbnail);
  console.log(
    `🛈 ${eventsNeedingVideoThumbnailAdded.length} of ${events.length} events have a video and need a video thumbnail added`,
  );

  for (const event of eventsNeedingVideoThumbnailAdded) {
    const video_thumbnail = await module.exports.getVideoThumbnail(event.video);

    if (video_thumbnail) {
      const updateRecordResult = await airTable.updateRecordById(airTable.eventsTable(), event.id, {
        video_thumbnail: [
          {
            url: video_thumbnail,
          },
        ],
      });

      if (updateRecordResult.error) {
        console.error(
          `❌ Could not update event record in AirTable for event ${event.name} (${event.id})`,
          updateRecordResult.error,
        );
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
    console.error('❌ Could not get events from AirTable', events.error);

    return;
  }

  const eventsFormatted = events.map((event) => eventsHelper.formatEventFromAirTable(event));

  return eventsFormatted;
}

async function getVideoThumbnail(videoUrl) {
  if (!videoUrl.includes('vimeo.com')) return; // currently this only works for Vimeo videos

  const vimeoVideoId = module.exports.getVimeoVideoIdFromUrl(videoUrl);
  if (!vimeoVideoId) return;

  try {
    const vimeoResponse = await axios.get(`https://player.vimeo.com/video/${vimeoVideoId}/config`);

    if (vimeoResponse.status === 200) {
      if (vimeoResponse.data?.video?.thumbs) {
        return (
          vimeoResponse.data.video.thumbs['1280'] ??
          vimeoResponse.data.video.thumbs['960'] ??
          vimeoResponse.data.video.thumbs.base
        );
      } else {
        console.error(
          `❌ Could not get Vimeo thumbnail for video ID ${vimeoVideoId} -- no thumbnail returned from Vimeo`,
        );
      }
    } else {
      console.error(
        `❌ Could not get Vimeo thumbnail for video ID ${vimeoVideoId} -- error connecting to Vimeo API`,
        vimeoResponse.statusText,
      );
    }
  } catch (error) {
    console.error(
      `❌ Could not get Vimeo thumbnail for video ID ${vimeoVideoId} -- error connecting to Vimeo API`,
      error,
    );
  }

  return;
}

function getVimeoVideoIdFromUrl(vimeoVideoUrl) {
  const url = new URL(vimeoVideoUrl);

  return url.pathname.split('/').pop();
}

async function startGettingNewVideoThumbnails() {
  console.log(`🚀 Started getting new thumbnails for event videos at ${new Date()}`);

  const events = await module.exports.getAllEvents();

  await module.exports.addEventsVideoThumbnailIfNeeded(events);

  console.log('🏁 Complete!');
}

module.exports = {
  addEventsVideoThumbnailIfNeeded,
  getAllEvents,
  getVideoThumbnail,
  getVimeoVideoIdFromUrl,
  startGettingNewVideoThumbnails,
};
