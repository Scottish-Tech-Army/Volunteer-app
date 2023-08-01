// Get video thumbnails and MP4 video files for event videos

require('dotenv').config()
import {
  updateRecordById,
  eventsTable,
  getAllRecords,
} from '../helpers/airTable'
import { formatEventFromAirTable } from '../helpers/events'
import { logError } from '../services/logging'
import { getVideoThumbnail } from '../services/vimeo'
import { delay } from '../util/timing'

// Add thumbnails to any events that have a video but don't yet have a thumbnail
// We save the image itself to AirTable, so this doesn't need refreshing later
async function addEventsVideoThumbnails(events) {
  const eventsNeedingVideoThumbnailAdded = events.filter(
    event => event.video_webpage && !event.video_thumbnail,
  )
  console.log(
    `🛈 ${eventsNeedingVideoThumbnailAdded.length} of ${events.length} events have a video and need a video thumbnail added`,
  )

  for (const event of eventsNeedingVideoThumbnailAdded) {
    const video_thumbnail = await getVideoThumbnail(event.video_webpage)

    if (video_thumbnail) {
      const updateRecordResult = await updateRecordById(
        eventsTable(),
        event.id,
        {
          video_thumbnail: [
            {
              url: video_thumbnail,
            },
          ],
        },
      )

      if (updateRecordResult.error) {
        logError(
          `❌ Could not update event record in AirTable for event ${event.name} (${event.id})`,
          {
            extraInfo: updateRecordResult.error,
          },
        )
      } else {
        console.log(
          `✅ Added video thumbnail for event ${event.name} (${event.id})`,
        )
      }
    }

    await delay(1000) // wait for 1 second, in case we are calling Vimeo's API multiple times we don't want to hit a rate limit
  }
}

async function getAllEvents() {
  const events = await getAllRecords(eventsTable(), true)

  if (events.error) {
    logError('❌ Could not get events from AirTable', {
      extraInfo: events.error,
    })

    return
  }

  const eventsFormatted = events.map(event => formatEventFromAirTable(event))

  return eventsFormatted
}

// Begin the steps to get thumbnail images for events that don't already have them
async function startGettingNewVideoThumbnails() {
  console.log(
    `🚀 Started getting new thumbnails for event videos at ${new Date()}`,
  )

  const events = await _getAllEvents()

  await _addEventsVideoThumbnails(events)

  console.log('🏁 Complete!')
}

export default {
  addEventsVideoThumbnails,
  getAllEvents,
  startGettingNewVideoThumbnails,
}
