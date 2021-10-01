import express from 'express';
const router = express.Router();
import projectsApi from './projects.js'

router.use('/projects', projectsApi);

export default router;