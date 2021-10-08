const express = require('express');
const router = express.Router();
const projectsApi = require('./projects')

router.use('/projects', projectsApi);

module.exports = router;