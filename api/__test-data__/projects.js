const { faker } = require('@faker-js/faker');

const projectTypes = ['Charity', 'Design and Build', 'External Project', 'External STA Project', 'Internal'];
const frequencyUnits = ['days', 'days a week', 'days total', 'hours', 'hours a week'];

function fakeHours() {
  return `${faker.datatype.number({ min: 1, max: 4 })}-${faker.datatype.number({
    min: 5,
    max: 8,
  })} ${faker.random.arrayElement(frequencyUnits)}`;
}

function fakeItKey() {
  return `IT-${faker.datatype.number({ min: 100, max: 999 })}`;
}

function fakeResId() {
  return `${faker.datatype.number({ min: 15000, max: 15999 })}`;
}

function fakeJiraItApiResultIssuesObject() {
  return {
    key: fakeItKey(),
    fields: {
      summary: faker.lorem.sentence(),
      description: faker.lorem.sentences(4),
      customfield_10027: faker.company.companyName(), // client
      customfield_10159: faker.helpers.randomize([faker.internet.url(), '']), // video URL
      customfield_10090: faker.helpers.randomize([faker.internet.url(), '']), // scope URL
      customfield_10148: { value: faker.lorem.sentence(), 
      }, //sector 
    },
  };
}

function fakeJiraItApiResults(count) {
  const fakeIssuesObjectArray = [];

  for (let i = 0; i < count; i++) {
    fakeIssuesObjectArray.push(fakeJiraItApiResultIssuesObject());
  }

  return {
    data: {
      issues: fakeIssuesObjectArray,
      total: count.toString(),
    },
  };
}

function fakeJiraResApiResultIssuesObject() {
  return {
    id: fakeResId(),
    fields: {
      customfield_10109: fakeItKey(),
      customfield_10112: faker.random.arrayElement(projectTypes), // project type
      customfield_10113: faker.name.jobTitle(), // role
      customfield_10061: faker.lorem.sentence(), // skills
      customfield_10062: fakeHours(), // hours
      customfield_10108: {
        value: faker.helpers.randomize(['Yes', '']),
      }, // buddying
    },
  };
}

function fakeJiraResApiResults(count) {
  const fakeIssuesObjectArray = [];

  for (let i = 0; i < count; i++) {
    fakeIssuesObjectArray.push(fakeJiraResApiResultIssuesObject());
  }

  return {
    data: {
      issues: fakeIssuesObjectArray,
      total: count.toString(),
    },
  };
}

function fakeProjectObject() {
  return {
    it_key: fakeItKey(),
    name: faker.lorem.sentence(),
    description: faker.lorem.sentences(4),
    client: faker.company.companyName(),
    video: faker.internet.url(),
    scope: faker.internet.url(),
    sector: faker.lorem.sentence()
  };
}

function fakeProjectObjects(count) {
  const fakeProjectObjectArray = [];

  for (let i = 0; i < count; i++) {
    fakeProjectObjectArray.push(fakeProjectObject());
  }

  return fakeProjectObjectArray;
}

function fakeProjectResourceObject() {
  const projectResourceObject = {
    ...fakeProjectObject(),
    ...fakeResourceObject(),
  };

  projectResourceObject.required = '1 person';
  projectResourceObject.skills = [projectResourceObject.skills];

  return projectResourceObject;
}

function fakeProjectResourceObjects(count) {
  const fakeProjectResourceObjectArray = [];

  for (let i = 0; i < count; i++) {
    fakeProjectResourceObjectArray.push(fakeProjectResourceObject());
  }

  return fakeProjectResourceObjectArray;
}

function fakeProjectAirTableRecords(count) {
  const fakeProjectObjectArray = [];

  for (let i = 0; i < count; i++) {
    fakeProjectObjectArray.push({
      id: faker.datatype.uuid(),
      ...fakeProjectObject(),
    });
  }

  return fakeProjectObjectArray;
}

function fakeResourceObject() {
  return {
    res_id: fakeResId(),
    it_key: fakeItKey(),
    type: faker.random.arrayElement(projectTypes),
    role: faker.name.jobTitle(),
    skills: faker.lorem.sentence(),
    hours: fakeHours(),
    required: 1,
    buddying: faker.datatype.boolean(),
  };
}

function fakeResourceObjects(count) {
  const fakeResourceObjectArray = [];

  for (let i = 0; i < count; i++) {
    fakeResourceObjectArray.push(fakeResourceObject());
  }

  return fakeResourceObjectArray;
}

function fakeAirTableProjectResource(numberRequired, includeBuddying) {
  const projectResource = {
    it_key: fakeItKey(),
    res_id: fakeResId(),
    name: faker.lorem.sentence(),
    type: faker.random.arrayElement(projectTypes),
    client: faker.company.companyName(),
    role: faker.name.jobTitle(),
    description: faker.lorem.sentences(4),
    video: faker.internet.url(),
    scope: faker.internet.url(),
    sector: faker.lorem.sentence(),
    skills: `${faker.lorem.words(5)}
    
    ${faker.lorem.words(5)}`,
    hours: fakeHours(),
    required: 1,
  };

  if (includeBuddying) projectResource.buddying = true;

  return projectResource;
}

module.exports = {
  fakeHours,
  fakeItKey,
  fakeResId,
  fakeJiraItApiResultIssuesObject,
  fakeJiraItApiResults,
  fakeJiraResApiResultIssuesObject,
  fakeJiraResApiResults,
  fakeProjectObject,
  fakeProjectObjects,
  fakeProjectResourceObject,
  fakeProjectResourceObjects,
  fakeProjectAirTableRecords,
  fakeResourceObject,
  fakeResourceObjects,
  fakeAirTableProjectResource,
};
