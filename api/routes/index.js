import { Router } from 'express'
const router = Router()
import { eventsApi } from './events'
import { projectsApi } from './projects'

router.use('/projects', projectsApi)
router.use('/events', eventsApi)

export default router
