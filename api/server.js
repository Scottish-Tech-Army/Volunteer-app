import { listen } from './app';
import cron from './cron-jobs/run-cron-jobs';

const port = 3000;

listen(port, () => {
  cron;
  console.log(`🛈 Volunteer App API is listening on port ${port} in ${process.env.NODE_ENV || 'development'} environment`);
});