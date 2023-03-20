const app = require("./app");
const cron = require('./cron-jobs/run-cron-jobs')

app.listen(3000, () => {
  cron;
  console.log("Volunteer App API is listening on port 3000");
});