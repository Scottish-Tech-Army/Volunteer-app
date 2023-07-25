const Bugsnag = require('@bugsnag/js');
const BugsnagPluginExpress = require('@bugsnag/plugin-express');
const cors = require('cors');
const express = require('express');
const v1Routes = require('./routes/v1/index');
const v2Routes = require('./routes/v1.1/index');
const logging = require('./services/logging');
const { version } = require('./package.json');

if (logging.enableBugsnag()) {
  Bugsnag.start({
    apiKey: process.env.BUGSNAG_API_KEY,
    appVersion: version,
    plugins: [BugsnagPluginExpress],
    releaseStage: process.env.NODE_ENV ?? 'development',
  });
} else {
  console.log("🛈 Bugsnag is not enabled (this is normal if you're in a development environment)");
}

const bugsnagMiddleware = logging.enableBugsnag() ? Bugsnag.getPlugin('express') : undefined;

const app = express();

// This must be the first piece of middleware in the stack
// It can only capture errors in downstream middleware
if (logging.enableBugsnag())
  app.use(bugsnagMiddleware.requestHandler);

app.use(cors());
app.use(express.json());
app.use('/v1', v1Routes);
app.use('/v1.1', v2Routes);

// This handles any errors that Express catches. This needs to go before other
// error handlers. BugSnag will call the `next` error handler if it exists.
if (logging.enableBugsnag())
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

module.exports = app;
