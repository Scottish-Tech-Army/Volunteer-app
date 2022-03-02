require('dotenv').config();
const AirTable = require('airtable');

exports.client = new AirTable().base(process.env.AIRTABLE_ID);

exports.projectsCacheTable = process.env.AIRTABLE_PROJECTS_CACHE_TABLE;

exports.resourcesCacheTable = process.env.AIRTABLE_RESOURCES_CACHE_TABLE;
