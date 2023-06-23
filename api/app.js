import { start, getPlugin } from '@bugsnag/js';
import BugsnagPluginExpress from '@bugsnag/plugin-express';
import cors from 'cors';
import express, { json } from 'express';
import routes from './routes/index';
import { enableBugsnag } from './services/logging';
import { version } from './package.json';

if (enableBugsnag()) {
  start({
    apiKey: process.env.BUGSNAG_API_KEY,
    appVersion: version,
    plugins: [BugsnagPluginExpress],
    releaseStage: process.env.NODE_ENV ?? 'development',
  });
} else {
  console.log("🛈 Bugsnag is not enabled (this is normal if you're in a development environment)");
}

const bugsnagMiddleware = enableBugsnag() ? getPlugin('express') : undefined;

const app = express();

// This must be the first piece of middleware in the stack
// It can only capture errors in downstream middleware
if (enableBugsnag())
  app.use(bugsnagMiddleware.requestHandler);

app.use(cors());
app.use(json());
app.use('/v1', routes);

// This handles any errors that Express catches. This needs to go before other
// error handlers. BugSnag will call the `next` error handler if it exists.
if (enableBugsnag())
  app.use(bugsnagMiddleware.errorHandler);

app.use((req, res, next) => {
  const err = new Error("Something went wrong. Please try again.");
  err.status = 500;
  next(err);
});

app.use((err, req, res, next) => {
  const notFound = new Error('Resource Not Found');
  notFound.status = 404;
  next(notFound);
});

export default app;
