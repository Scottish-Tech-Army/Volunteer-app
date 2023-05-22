/**
 * @file Defines groups of related project roles
 * These are used e.g. for searching projects
 */

import Fuse from 'fuse.js'

export interface RoleGroup {
  groupName: RoleGroupName
  roleNames: string[]
}

export enum RoleGroupName {
  BAPM = 'BA/PM',
  ProductManager = 'Product Manager',
  Analyst = 'Analyst',
  ProjectManagement = 'Project Management',
  ScrumMaster = 'Scrum Master',
  WebDeveloper = 'Web Developer',
  MobileDeveloper = 'Mobile Developer',
  EngineerDevOps = 'Engineer/DevOps',
  Researcher = 'Researcher',
  UIUX = 'UI/UX',
  TestQA = 'Test/QA Analyst',
  DataDatabase = 'Data/Databases',
  Architect = 'Architect',
  Security = 'Security',
  InfrastructureEngineerCloud = 'Infrastructure Engineer/Cloud',
  TechSupport = 'Tech Support',
  Trainer = 'Trainer',
  DigitalConsultant = 'Digital Consultant',
  Communications = 'Communications',
  Writer = 'Writer',
  Marketing = 'Marketing',
}

export const roleGroups: RoleGroup[] = [
  {
    groupName: RoleGroupName.BAPM,
    roleNames: [
      'Business Analyst',
      'Business Change Analyst',
      'Business Systems Analyst',
      'Change Analyst',
      'Management Consultant',
      'Process Analyst',
      'Technical Analyst',
      'Senior Business Architect',
    ],
  },
  {
    groupName: RoleGroupName.ProductManager,
    roleNames: [
      'BA/PM',
      'Business Analyst',
      'Product Manager',
      'Product Owner',
      'Project Administrator',
    ],
  },
  {
    groupName: RoleGroupName.Analyst,
    roleNames: ['Data Analyst', 'Business Intelligence Analyst', 'MI Analyst'],
  },
  {
    groupName: RoleGroupName.ProjectManagement,
    roleNames: [
      'PMO Analyst',
      'Project Co-ordinator',
      'Project Analyst',
      'PMO Lead',
    ],
  },
  {
    groupName: RoleGroupName.ScrumMaster,
    roleNames: ['Scrum Master'],
  },

  {
    groupName: RoleGroupName.WebDeveloper,
    roleNames: [
      'Web developer',
      'Front End Developer',
      'Back End Developer',
      'Full Stack Developer',
    ],
  },
  {
    groupName: RoleGroupName.MobileDeveloper,
    roleNames: ['Mobile Developer', 'Mobile Application Developer'],
  },
  {
    groupName: RoleGroupName.EngineerDevOps,
    roleNames: ['Software engineer', 'DevOps Engineer', 'DevOps'],
  },

  {
    groupName: RoleGroupName.Researcher,
    roleNames: ['Researcher', 'User Researcher', 'UX Researcher'],
  },
  {
    groupName: RoleGroupName.UIUX,
    roleNames: [
      'UI/UX designer',
      'UI designer',
      'UX designer',
      'Interaction Designer',
      'Visual Designer',
    ],
  },
  {
    groupName: RoleGroupName.TestQA,
    roleNames: [
      'Test Analyst',
      'Quality Analyst',
      'Quality Assurance Analyst',
      'QA Analyst',
    ],
  },

  {
    groupName: RoleGroupName.DataDatabase,
    roleNames: [
      'Data Engineer',
      'Data Scientist',
      'Data Modeller',
      'Data Developer',
      'Database Administrator',
    ],
  },
  {
    groupName: RoleGroupName.Architect,
    roleNames: ['Solutions Architect', 'IT architect', 'Design Architect'],
  },
  {
    groupName: RoleGroupName.Security,
    roleNames: [
      'Cyber Security Analyst',
      'Data Security Officer',
      'InfoSec Manager',
    ],
  },
  {
    groupName: RoleGroupName.InfrastructureEngineerCloud,
    roleNames: [
      'Infrastructure Engineer/Cloud',
      'Infrastructure Engineer',
      'Cloud Engineer',
    ],
  },
  {
    groupName: RoleGroupName.TechSupport,
    roleNames: [
      'Tech Help',
      'IT Support',
      '1st Line Support',
      '2nd Line Support',
      'Support Technician',
    ],
  },

  {
    groupName: RoleGroupName.Trainer,
    roleNames: ['Trainer', 'Digital trainer', 'Technology Trainer'],
  },
  {
    groupName: RoleGroupName.DigitalConsultant,
    roleNames: ['Digital Consultant', 'Digital Transformation Consultant'],
  },

  {
    groupName: RoleGroupName.Communications,
    roleNames: [
      'Communications manager',
      'Communications Director',
      'Public Relations Manager',
      'Social Media Manager',
      'Fundraising manager',
    ],
  },
  {
    groupName: RoleGroupName.Writer,
    roleNames: [
      'Copywriter',
      'Advertising Copywriter',
      'Communications Specialist',
    ],
  },
  {
    groupName: RoleGroupName.Marketing,
    roleNames: [
      'Marketing Manager',
      'Brand Manager',
      'Product Marketing Manager',
      'Marketing Executive',
      'Social Media Manager',
    ],
  },
]

export const getRoleGroupIndex = (
  possibleRoleName: string,
): number | undefined => {
  const fuse = new Fuse(roleGroups, {
    keys: ['roleNames'],
  })
  const fuseResults = fuse.search(possibleRoleName)

  for (const fuseResult of fuseResults) {
    for (const role of fuseResult.item.roleNames) {
      return Number(role)
    }
  }
  return undefined
}
