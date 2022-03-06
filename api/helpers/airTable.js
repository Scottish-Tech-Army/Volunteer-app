require('dotenv').config();
const AirTable = require('airtable');

client = new AirTable().base(process.env.AIRTABLE_ID);

projectsCacheTable = () => process.env.AIRTABLE_PROJECTS_CACHE_TABLE;

resourcesCacheTable = () => process.env.AIRTABLE_RESOURCES_CACHE_TABLE;

module.exports = {
  client,
  projectsCacheTable,
  resourcesCacheTable,
};
