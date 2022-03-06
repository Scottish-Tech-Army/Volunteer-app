const cron = require('node-cron');
const projects = require('./projects');

// Runs every 15 minutes
cron.schedule('*/15 * * * *', () => {
  projects.start();
});
