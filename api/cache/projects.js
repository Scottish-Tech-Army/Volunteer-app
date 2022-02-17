require('dotenv').config();
const AirTable = require('airtable');
const airTableClient = new AirTable().base(process.env.AIRTABLE_ID);
const axios = require('axios').default;
const api_key = process.env.API_KEY;
const email = process.env.EMAIL;
const resourcingJiraBoardName = 'RES';
const recruiterAssignedJiraColumnName = 'Recruiter Assigned';

const ResArray = [];
const ItArray = [];

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
      it_related_field_id: x['fields'].customfield_10109, // TODO: change it_key to project_key?
      projectType: x['fields'].customfield_10112,
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
      // TODO: add project type
    }),
  );
  if (ItArray.length < ItTotalData) {
    let ItStartResultSearch = ItArray.length;
    return jiraItDataCall(ItStartResultSearch);
  }
  return;
}

const filterProjectsConnectedWithResources = (ItArray, ResArray) =>
  ItArray.filter((project) => ResArray.some((resource) => resource.it_related_field_id === project.it_key));

const filterResourcesConnectedWithProjects = (ItArray, ResArray) =>
  ResArray.filter((resource) => ItArray.some((project) => project.it_key === resource.it_related_field_id));

const formatProjects = (projects, resources) =>
  projects.map((project) => {
    const resourcesConnectedToProject = resources.filter((resource) => resource.it_related_field_id === project.it_key);
    const projectType = resourcesConnectedToProject.length ? resourcesConnectedToProject[0].projectType : '';

    return {
      ...project,
      type: projectType,
    };
  });

const getAllProjectsAndResourcesFromJira = async () => {
  return new Promise((resolve) => {
    console.log('Starting...');

    const callAllResData = Promise.resolve(jiraResourceDataCall(0));
    const callAllItData = Promise.resolve(jiraItDataCall(0));

    Promise.all([callAllResData, callAllItData]).then(() => {
      const projectsFiltered = filterProjectsConnectedWithResources(ItArray, ResArray);
      const resourcesFiltered = filterResourcesConnectedWithProjects(ItArray, ResArray);
      const projectsFilteredAndFormatted = formatProjects(projectsFiltered, resourcesFiltered);

      console.log(projectsFilteredAndFormatted.length, resourcesFiltered.length);

      resolve({
        projects: projectsFilteredAndFormatted,
        resources: resourcesFiltered,
      });
    });
  });
};

const cacheProjectsAndResources = async (projects, resources) => {
  console.log('Start caching...');

  // AirTable accepts creating records in groups of 10 (faster than doing just one record at at time),
  // so we chunk our data into an array of arrays, where each top-level array item is an array of up to 10 projects/resources

  const projectsChunked = chunkArray(projects, 10);

  projectsChunked.forEach((projectsChunk) => {
    // await airTableClient.table(process.env.AIRTABLE_PROJECTS_CACHE_TABLE).create({
    //   fields: project,
    // });
    // project.resources.forEach((resource) => {
    //   const projectResource = {};
    // });
  });
};

const chunkArray = (array, chunkSize) => {
  const chunked = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunked.push(array.slice(i, i + chunkSize));
  }

  return chunked;
};

const projectsWithResources = getAllProjectsAndResourcesFromJira().then((data) => {
  console.log('data', data);
  console.log('data.projects', data.projects.length, 'data.resources', data.resources.length);
  cacheProjectsAndResources(data.projects, data.resources);
});
