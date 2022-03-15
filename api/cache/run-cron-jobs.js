const cron = require('node-cron');
const projects = require('./projects');

console.log('🛈 Running scheduled cron jobs... please leave this terminal window open as long as you want these to keep running');

// Runs every 15 minutes when activated -- see README for more information
cron.schedule('*/15 * * * *', () => {
  projects.start();
});
