// Run all the scheduled cron jobs
// See the README for more information on cron jobs and projects caching

import { schedule } from 'node-cron'
import { startGettingNewVideoThumbnails } from './events'
import { startCachingLatestFromJira } from './projects'

console.log(
  '🛈 Running scheduled cron jobs... please leave this terminal window open as long as you want these to keep running',
)

// Runs every 15 minutes when activated
// Projects and events MP4 video file URLs must be updated at least hourly
schedule('*/15 * * * *', async () => {
  await startCachingLatestFromJira()
})

// Runs once every day at midnight when activated
schedule('0 0 * * *', async () => {
  await startGettingNewVideoThumbnails()
})
