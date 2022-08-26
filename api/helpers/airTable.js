require('dotenv').config();
const AirTable = require('airtable');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// AirTable doesn't include fields that it sees as empty (including its equivalent of boolean false) so we need to populate them
function addEmptyFields(record, fieldDefinitions) {
  for (const [fieldName, fieldProperties] of Object.entries(fieldDefinitions)) {
    if (!record[fieldName]) {
      switch (fieldProperties.type) {
        case 'array':
          record[fieldName] = [];
          break;
        case 'boolean':
          record[fieldName] = false;
          break;
        case 'number':
          record[fieldName] = 0;
          break;
        case 'string':
          record[fieldName] = '';
          break;
      }
    }
  }

  return record;
}

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

function connectionErrorMessage() {
  return '❌ Could not connect to AirTable - please check you have the correct details in your .env file.';
}

function eventsTable() {
  return process.env.AIRTABLE_EVENTS_TABLE;
}

// AirTable returns durations as a number of seconds (e.g. 3600 = 1 hour), we want it in minutes (e.g. 60 = 1 hour)
function formatDuration(durationInSeconds) {
  if (!durationInSeconds) return durationInSeconds;

  return durationInSeconds / 60;
}

// AirTable returns times as a number of seconds from midnight (e.g. 39600) rather than a human-friendly time (e.g. "11:00")
function formatTime(timeInSeconds) {
  if (!timeInSeconds) return timeInSeconds;

  return dayjs().hour(0).minute(0).second(0).add(timeInSeconds, 'second').format('HH:mm');
}

async function getAllRecords(tableName, includeId = false) {
  try {
    const allRecordsRaw = await module.exports.client().table(tableName).select().all();

    return allRecordsRaw.map((record) =>
      includeId // if records don't already have a unique identifier column (e.g. events), it's useful to include the record ID from AirTable
        ? {
            id: record.id,
            ...record.fields,
          }
        : record.fields,
    );
  } catch (error) {
    return error;
  }
}

async function getRecordById(tableName, recordId) {
  try {
    const recordsRaw = await module.exports.client().table(tableName).find(recordId);

    return recordsRaw.fields;
  } catch (error) {
    console.error(error);

    return error;
  }
}

async function getRecordByQuery(tableName, filterQuery) {
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

    return error;
  }
}

function projectsResourcesCacheTable() {
  return process.env.AIRTABLE_PROJECTS_RESOURCES_CACHE_TABLE;
}

// Data from 'attachment' fields in AirTable (images or files) come through in a nested array of objects
// We simplify this to just get an array of URLs to the files instead
function simplifyAttachmentsData(attachmentsFieldDataFromAirTable) {
  return attachmentsFieldDataFromAirTable?.length
    ? attachmentsFieldDataFromAirTable.map((airTableAttachmentObject) => airTableAttachmentObject.url)
    : [];
}

// Update an AirTable record based on its ID
// You only need to include the fields you want to update (not other fields, which will remain untouched)
// For examples of updating data see https://airtable.com/appcvHsm6PC8mZth2/api/docs#javascript/table:sta%20events:update
async function updateRecordById(tableName, recordId, fields) {
  try {
    const updateData = [
      {
        id: recordId,
        fields,
      },
    ];

    const result = await module.exports.client().table(tableName).update(updateData);

    return result;
  } catch (error) {
    console.error(error);

    return error;
  }
}

module.exports = {
  addEmptyFields,
  client,
  connectionErrorMessage,
  eventsTable,
  formatDuration,
  formatTime,
  getAllRecords,
  getRecordById,
  getRecordByQuery,
  projectsResourcesCacheTable,
  simplifyAttachmentsData,
  updateRecordById,
};
