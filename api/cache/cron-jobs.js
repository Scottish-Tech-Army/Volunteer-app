const cron = require('node-cron');
const projects = require('./projects');

cron.schedule('*/15 * * * *', () => {
  projects.start();
});
