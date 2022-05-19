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

async function getRecord(tableName, filterQuery) {
  // See docs on AirTable formula queries here: https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference#logical
  let filterFormula = '';
  for (const [fieldName, fieldValue] of Object.entries(filterQuery)) {
    filterFormula += `{${fieldName}} = '${fieldValue}',`;
  }
  filterFormula = filterFormula.slice(0, -1); // remove last trailing comma
  filterFormula = `AND(${filterFormula})`;

  try {
    const recordsRaw = await module.exports
      .client()
      .table(tableName)
      .select({
        filterByFormula: filterFormula,
      })
      .all();

    return recordsRaw.length ? recordsRaw[0].fields : undefined;
  } catch (error) {
    console.error(error);

    return;
  }
}

function projectsResourcesCacheTable() {
  return process.env.AIRTABLE_PROJECTS_RESOURCES_CACHE_TABLE;
}

module.exports = {
  client,
  getAllRecords,
  getRecord,
  projectsResourcesCacheTable,
};
