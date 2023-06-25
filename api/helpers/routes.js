import logging from '../services/logging';

function sendError(res, errorMessage, data) {
  logging.logError(errorMessage, {
    extraInfo: data,
  });

  res.status(400).send(
    data ?? {
      error: errorMessage,
    },
  );
}

export default {
  sendError,
};
