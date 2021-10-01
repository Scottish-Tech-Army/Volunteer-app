const express = require('express');
const router = express.Router();
const data = require('../data');
const jiraProjectHelper = require('../jira-helpers/projects')

router.get('/', (req, res) => {
    let returnedData = jiraProjectHelper.getProjects();
    res.json(returnedData);
});

module.exports = router;