require('dotenv').config();
const AirTable = require('airtable');
const airTableClient = new AirTable().base(process.env.AIRTABLE_ID);
const airTableProjectsCacheTable = process.env.AIRTABLE_PROJECTS_CACHE_TABLE;
const airTableResourcesCacheTable = process.env.AIRTABLE_RESOURCES_CACHE_TABLE;
const axios = require('axios').default;
const api_key = process.env.API_KEY;
const email = process.env.EMAIL;
const resourcingJiraBoardName = 'RES';
const recruiterAssignedJiraColumnName = 'Recruiter Assigned';

const ResArray = [];
const ItArray = [];

getAllProjectsAndResourcesFromJira().then((data) => {
  cacheProjectsAndResources(data.projects, data.resources);
});

async function addNewProjectsAndResources(projects, resources) {
  // AirTable accepts creating records in groups of 10 (faster than doing just one record at at time),
  // so we chunk our data into an array of arrays, where each top-level array item is an array of up to 10 projects/resources

  const projectsChunked = chunkArray(projects, 10);
  const resourcesChunked = chunkArray(resources, 10);

  console.log('🛈 Saving projects');
  for (const projectsChunk of projectsChunked) {
    await addNewRecords(airTableProjectsCacheTable, projectsChunk);
  }

  console.log('🛈 Saving resources');
  for (const resourcesChunk of resourcesChunked) {
    await addNewRecords(airTableResourcesCacheTable, resourcesChunk);
  }

  console.log('🛈 Finished saving new cache data');
}

async function addNewRecords(tableName, recordsChunk) {
  const recordsChunkFormattedForAirTable = recordsChunk.map((record) => ({
    fields: record,
  }));

  const saveResult = await airTableClient.table(tableName).create(recordsChunkFormattedForAirTable);
}

async function cacheProjectsAndResources(projects, resources) {
  if (!projects.length || !resources.length) {
    console.error('❌ No projects/resources returned from Jira API, so aborted updating cache');

    return;
  }

  console.log('🛈 Attempting to cache new data');

  try {
    await deleteExistingProjectsAndResources();
  } catch (error) {
    console.error('❌ Could not delete existing projects/resources records in cache, so aborted updating cache');

    return;
  }

  try {
    await addNewProjectsAndResources(projects, resources);
  } catch (error) {
    console.error('❌ Could not save new projects/resources records in cache');

    return;
  }

  console.log('✅ Complete!');
}

function chunkArray(array, chunkSize) {
  const chunked = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    chunked.push(array.slice(i, i + chunkSize));
  }

  return chunked;
}

async function deleteAllRecords(tableName) {
  return new Promise(async (resolve, reject) => {
    const allRecordsRaw = await airTableClient.table(tableName).select().all();

    // AirTable accepts creating records in groups of 10 (faster than doing just one record at at time),
    // so we chunk our data into an array of arrays, where each top-level array item is an array of up to 10 records
    const allRecordsChunked = chunkArray(allRecordsRaw, 10);

    allRecordsChunked.forEach(async (recordsChunk) => {
      const recordIds = recordsChunk.map((record) => record.id);

      try {
        await deleteRecords(tableName, recordIds);
      } catch (error) {
        console.error(`❌ Error deleting all records in table ${tableName}`);

        reject();
      }
    });

    resolve();
  });
}

async function deleteRecords(tableName, recordIds) {
  return new Promise(async (resolve, reject) => {
    airTableClient.table(tableName).destroy(recordIds, (error, deletedRecords) => {
      if (error) {
        console.error('❌ AirTable delete error', error);

        reject();
      }

      resolve();
    });
  });
}

function deleteExistingProjectsAndResources() {
  return new Promise(async (resolve, reject) => {
    const tables = [airTableProjectsCacheTable, airTableResourcesCacheTable];
    let success = true;

    for (const tableName of tables) {
      console.log(`🛈 Deleting old records from ${tableName}`);

      try {
        await deleteAllRecords(tableName);
      } catch (error) {
        reject();
      }
    }

    resolve();
  });
}

function filterProjectsConnectedWithResources(ItArray, ResArray) {
  return ItArray.filter((project) => ResArray.some((resource) => resource.it_key === project.it_key));
}

function filterResourcesConnectedWithProjects(ItArray, ResArray) {
  return ResArray.filter((resource) => ItArray.some((project) => project.it_key === resource.it_key));
}

function formatProjects(projects, resources) {
  return projects.map((project) => {
    const resourcesConnectedToProject = resources.filter((resource) => resource.it_key === project.it_key);
    const projectType = resourcesConnectedToProject.length ? resourcesConnectedToProject[0].projectType : '';

    return {
      ...project,
      type: projectType,
    };
  });
}

async function getAllProjectsAndResourcesFromJira() {
  console.log('🛈 Getting data from Jira API - this can take 15 seconds or more');

  return new Promise((resolve) => {
    const callAllResData = Promise.resolve(jiraResourceDataCall(0));
    const callAllItData = Promise.resolve(jiraItDataCall(0));

    Promise.all([callAllResData, callAllItData]).then(() => {
      const projectsFiltered = filterProjectsConnectedWithResources(ItArray, ResArray);
      const resourcesFiltered = filterResourcesConnectedWithProjects(ItArray, ResArray);
      const projectsFilteredAndFormatted = formatProjects(projectsFiltered, resourcesFiltered);

      console.log(
        `🛈 Found ${projectsFilteredAndFormatted.length} projects matching resources, ${resourcesFiltered.length} resources matching projects`,
      );

      resolve({
        projects: projectsFilteredAndFormatted,
        resources: resourcesFiltered,
      });
    });
  });
}

async function jiraItDataCall(ItstartAt) {
  const jiraIt = await axios.get(
    `https://sta2020.atlassian.net/rest/api/2/search?jql=project=IT&startAt=${ItstartAt}&maxResults=1000`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          // below use email address you used for jira and generate token from jira
          `${email}:${api_key}`,
        ).toString('base64')}`,
        Accept: 'application/json',
      },
    },
  );

  const ItTotalData = parseInt(jiraIt.data.total);

  const ItData = jiraIt.data.issues.map((x) =>
    ItArray.push({
      it_key: x['key'],
      name: x['fields'].summary,
      description: x['fields'].description,
      client: x['fields'].customfield_10027,
      video: x['fields'].customfield_10159 ?? '',
    }),
  );
  if (ItArray.length < ItTotalData) {
    let ItStartResultSearch = ItArray.length;
    return jiraItDataCall(ItStartResultSearch);
  }
  return;
}

async function jiraResourceDataCall(startAt) {
  const jqlQuery = encodeURIComponent(
    `project=${resourcingJiraBoardName} AND status="${recruiterAssignedJiraColumnName}"`,
  );
  const jiraRes = await axios.get(
    `https://sta2020.atlassian.net/rest/api/2/search?jql=${jqlQuery}&startAt=${startAt}&maxResults=1000`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          // below use email address you used for jira and generate token from jira
          `${email}:${api_key}`,
        ).toString('base64')}`,
        Accept: 'application/json',
      },
    },
  );

  const ResTotalData = parseInt(jiraRes.data.total);

  const ResourceDataDump = jiraRes.data.issues.map((x) =>
    ResArray.push({
      res_id: x['id'],
      it_key: x['fields'].customfield_10109,
      type: x['fields'].customfield_10112,
      role: x['fields'].customfield_10113,
      skills: x['fields'].customfield_10061 ?? '',
      hours: x['fields'].customfield_10062 ? x['fields'].customfield_10062 : '',
      required: 1, // currently hardcoded as cannot see number of people coming back in Jira results
      buddying: x['fields'].customfield_10108 ? x['fields'].customfield_10108.value.toLowerCase() === 'yes' : false,
    }),
  );

  if (ResArray.length < ResTotalData) {
    let ResStartResultSearch = ResArray.length;
    return jiraResourceDataCall(ResStartResultSearch);
  }
  return;
}
