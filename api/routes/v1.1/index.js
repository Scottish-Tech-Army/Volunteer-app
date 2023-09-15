const express = require('express');
const router = express.Router();
const { eventsApi } = require('../events');
const { projectsApi } = require('../projects');
const { apiKeyMiddleware } = require('../apiKeyMiddleware');

router.use(apiKeyMiddleware)
router.use('/projects', projectsApi);
router.use('/events', eventsApi);

module.exports = router;
