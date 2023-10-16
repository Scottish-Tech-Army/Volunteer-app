const express = require("express");
const router = express.Router();
const { eventsApi } = require("../events");
const { projectsApi } = require("../projects");
const { apiKeyMiddleware } = require("../apiKeyMiddleware");
const { authApi, middlewares: authMiddlewares } = require("../auth");

router.use(apiKeyMiddleware);
router.use("/projects", projectsApi);
router.use("/events", eventsApi);
router.use("/auth", authMiddlewares, authApi);

module.exports = router;
