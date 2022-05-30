const cron = require('node-cron');
const events = require('./events');
const projects = require('./projects');

console.log(
  '🛈 Running scheduled cron jobs... please leave this terminal window open as long as you want these to keep running',
);

// See the README for more information on cron jobs and projects caching

// Runs every 15 minutes when activated
cron.schedule('*/15 * * * *', () => {
  projects.startCachingLatestFromJira();
});

// Runs once every day at midnight when activated
cron.schedule('0 0 * * *', () => {
  events.startGettingNewVideoThumbnails();
});
