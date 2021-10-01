import fetch from "node-fetch";
import 'dotenv';
const apiKey = process.env.JIRA_API_KEY
const apiUser = process.env.JIRA_API_USER
const jiraBaseUrl = process.env.JIRA_API_BASE_URL

let getProjects = fetch(jiraBaseUrl + '/search?jql=project=RES&maxResults=1000', {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ${apiUser}:${apiKey}',
      'Accept': 'application/json'
    }
  })
.then(response => response.json())
.then(data => console.log(data));

const _getProjects = getProjects;
export { _getProjects as getProjects };  