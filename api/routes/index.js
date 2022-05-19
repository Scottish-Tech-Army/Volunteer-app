const express = require('express');
const router = express.Router();
const { eventsApi } = require('./events');
const { projectsApi } = require('./projects');

router.use('/projects', projectsApi);
router.use('/events', eventsApi);

module.exports = router;
