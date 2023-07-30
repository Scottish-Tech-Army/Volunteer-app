exports.chunk = function (array, chunkSize) {
  const chunked = []

  for (let i = 0; i < array.length; i += chunkSize) {
    chunked.push(array.slice(i, i + chunkSize))
  }

  return chunked
}
