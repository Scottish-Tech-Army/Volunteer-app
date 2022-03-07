require('dotenv').config();
const AirTable = require('airtable');

function client() {
  return new AirTable().base(process.env.AIRTABLE_ID);
}

async function getAllRecords(tableName) {
  const allRecordsRaw = await module.exports.client().table(tableName).select().all();

  return allRecordsRaw.map((record) => record.fields);
}

async function getRecord(tableName, fieldName, fieldValue) {
  const recordsRaw = await module.exports
    .client()
    .table(tableName)
    .select({
      filterByFormula: `{${fieldName}} = '${fieldValue}'`,
    })
    .all();

  return recordsRaw.length ? recordsRaw[0].fields : undefined;
}

function projectsCacheTable() {
  return process.env.AIRTABLE_PROJECTS_CACHE_TABLE;
}

function resourcesCacheTable() {
  return process.env.AIRTABLE_RESOURCES_CACHE_TABLE;
}

module.exports = {
  client,
  getAllRecords,
  getRecord,
  projectsCacheTable,
  resourcesCacheTable,
};
