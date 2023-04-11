const Bugsnag = require('@bugsnag/js')

function logError(errorMessage, eventInfo) {
  console.error(errorMessage);
  if (eventInfo) console.error(eventInfo);

  if (process.env.NODE_ENV === 'production' || process.env.BUGSNAG_ALWAYS_SEND_BUGS === 'true')
    Bugsnag.notify(new Error(errorMessage), event => {
      if (eventInfo?.extraInfo)
        event.addMetadata('extraInfo', eventInfo.extraInfo);
    })
}

module.exports = {
  logError,
};
