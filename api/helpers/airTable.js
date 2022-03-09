require('dotenv').config();
const AirTable = require('airtable');

function client() {
  try {
    const airTableClient = new AirTable().base(process.env.AIRTABLE_ID);

    return airTableClient;
  } catch (error) {
    return {
      error,
    };
  }
}

async function getAllRecords(tableName) {
  try {
    const allRecordsRaw = await module.exports.client().table(tableName).select().all();

    return allRecordsRaw.map((record) => record.fields);
  } catch (error) {
    return {
      error,
    };
  }
}

async function getRecord(tableName, fieldName, fieldValue) {
  try {
    const recordsRaw = await module.exports
      .client()
      .table(tableName)
      .select({
        filterByFormula: `{${fieldName}} = '${fieldValue}'`,
      })
      .all();

    return recordsRaw.length ? recordsRaw[0].fields : undefined;
  } catch (error) {
    return {
      error,
    };
  }
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
