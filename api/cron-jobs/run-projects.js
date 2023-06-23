// This file exists just so we can run events cron jobs manually from the command line if we need to
// See the cron jobs section of the README for instructions on how to do this

import { startCachingLatestFromJira } from './projects';

startCachingLatestFromJira();
