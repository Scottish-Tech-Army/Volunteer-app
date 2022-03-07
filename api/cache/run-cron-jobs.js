const cron = require('node-cron');
const projects = require('./projects');

// Runs every 15 minutes when activated -- see README for more information
cron.schedule('*/15 * * * *', () => {
  projects.start();
});
