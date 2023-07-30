// Run all the scheduled cron jobs
// See the README for more information on cron jobs and projects caching

const cron = require('node-cron')
const events = require('./events')
const projects = require('./projects')

console.log(
  '🛈 Running scheduled cron jobs... please leave this terminal window open as long as you want these to keep running',
)

// Runs every 15 minutes when activated
// Projects and events MP4 video file URLs must be updated at least hourly
cron.schedule('*/15 * * * *', async () => {
  await projects.startCachingLatestFromJira()
})

// Runs once every day at midnight when activated
cron.schedule('0 0 * * *', async () => {
  await events.startGettingNewVideoThumbnails()
})
