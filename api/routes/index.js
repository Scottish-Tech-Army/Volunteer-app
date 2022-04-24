const express = require('express');
const router = express.Router();
const airTableApi = require('./airTable');
const { projectsApi } = require('./projects');

router.use('/projects', projectsApi);
router.use('/airtable', airTableApi);

module.exports = router;
