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

function logError(errorMessage, eventInfo) {
  console.error(errorMessage);
  if (eventInfo) console.error(eventInfo);

  if (enableBugsnag())
    Bugsnag.notify(new Error(errorMessage), event => {
      if (eventInfo?.extraInfo)
        event.addMetadata('extraInfo', eventInfo.extraInfo);
    });
}

module.exports = {
  enableBugsnag,
  logError,
};
