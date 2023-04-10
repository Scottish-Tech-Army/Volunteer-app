const app = require('./app');
const cron = require('./cron-jobs/run-cron-jobs');

const port = 3000;

app.listen(port, () => {
  cron;
  console.log(`Volunteer App API is listening on port ${port} in ${process.env.NODE_ENV || 'development'} environment`);
});