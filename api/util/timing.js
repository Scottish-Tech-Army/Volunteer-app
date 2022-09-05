// Prevents code executing for a set amount of time
// Usually it's better to use setTimeout, but this can be useful for pauses when repeatedly calling external APIs
function delay(milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout((_) => resolve(), milliseconds);
  });
}

module.exports = {
  delay,
};
