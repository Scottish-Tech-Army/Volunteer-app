const events = require('./events');

events.startGettingNewVideoThumbnails().then(() => events.startGettingVideoFiles());
