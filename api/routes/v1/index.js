const express = require("express");
const router = express.Router();
const { eventsApi } = require("../events");
const { projectsApi } = require("../projects");
const { authApi, middlewares: authMiddlewares } = require("../auth");

router.use("/projects", projectsApi);
router.use("/events", eventsApi);
router.use("/auth", authMiddlewares, authApi);

module.exports = router;
