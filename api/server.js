import { listen } from './app'
import cron from './cron-jobs/run-cron-jobs'

const port = 3000

listen(port, () => {
  cron

  console.log(
    `🛈 Volunteer App API is listening on port ${port} in ${
      process.env.NODE_ENV || 'development'
    } environment`,
  )

  // Check .env file values are set -- helpful check for devs
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const requiredEnvVariablesInDevelopment = [
      'AIRTABLE_ID',
      'AIRTABLE_API_KEY',
      'AIRTABLE_PROJECTS_RESOURCES_CACHE_TABLE',
      'API_TUNNEL_SUBDOMAIN',
      'JIRA_EMAIL',
      'JIRA_API_KEY',
      'SLACK_CHANNEL_VOLUNTEER_PROJECT_INTEREST',
      'SLACK_SECRET_WEBHOOK_INITIAL_TRIAGE_TEST',
      'VIMEO_CLIENT_ID',
      'VIMEO_CLIENT_SECRET',
      'VIMEO_ACCESS_TOKEN',
    ]

    requiredEnvVariablesInDevelopment.forEach(envVariable => {
      if (!process.env[envVariable])
        console.log(
          `❌ Environment variable ${envVariable} is missing or not set in your .env file`,
        )
    })
  }
})
