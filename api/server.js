
import cron from './cron-jobs/run-cron-jobs.js';
import { listen } from '../app/node_modules/expo/AppEntry.js';

const port = 3000;

listen(port, () => {
  cron;
  console.log(`🛈 Volunteer App API is listening on port ${port} in ${process.env.NODE_ENV || 'development'} environment`);
});