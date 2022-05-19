function sendError(res, errorMessage, data) {
  console.error(errorMessage);

  res.status(400).send(
    data ?? {
      error: errorMessage,
    },
  );
}

module.exports = {
  sendError,
};
