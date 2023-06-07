const Bugsnag = require('@bugsnag/js');

function enableBugsnag() {
  if (process.env.NODE_ENV === 'production' || process.env.BUGSNAG_ALWAYS_SEND_BUGS === 'true') {
    if (process.env.BUGSNAG_API_KEY) {
      return true;
    } else {
      console.error('❌ Could not enable Bugsnag -- BUGSNAG_API_KEY environment variable is required');
    }
  }

  return false;
}

/**
 * Logs errors to Bugsnag.
 *
 * @param {string} errorMessage An error message
 * @param {unknown} [extraInfo] Any optional extra info about the error -- e.g. some data or a caught exception, you can pass this as an object or other data type
 * @returns {React.ReactElement} Component
 */
function logError(errorMessage, extraInfo) {
  console.error(errorMessage);
  if (extraInfo) console.error(extraInfo);

  if (enableBugsnag())
    Bugsnag.notify(new Error(errorMessage), event => {
      if (extraInfo) event.addMetadata('extraInfo', extraInfo);
    });
}

module.exports = {
  enableBugsnag,
  logError,
};
