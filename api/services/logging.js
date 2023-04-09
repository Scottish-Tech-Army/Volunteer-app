const Bugsnag = require('@bugsnag/js')

function logError(errorMessage, eventInfo) {
  console.error(errorMessage);
  if (eventInfo) console.error(eventInfo);

  Bugsnag.notify(new Error(errorMessage), event => {
    if (eventInfo?.extraInfo)
      event.addMetadata('extraInfo', eventInfo.extraInfo);
  })
}

module.exports = {
  logError,
};
