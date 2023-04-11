# API development

This file contains some tips and guidelines on building our back-end Node JS API.  Please keep adding to it!

- [Cron jobs](#cron-jobs)
  - [Projects](#projects)
  - [Events](#events)
- [Services](#services)
  - [Slack](#slack)
- [Logging errors](#logging-errors)

## Cron jobs

[Cron jobs](https://en.wikipedia.org/wiki/Cron) are bits of code that can run regularly in the background to carry out things that need to be done repeatedly on a schedule (rather than code that's triggered by a user request, like most of our API).

These are stored in the `/api/cron-jobs` directory. Please see instructions at the end of the [Subsequent run](#subsequent-run) section above on how to run these scripts.

We make use of cron jobs on the API server for a couple of things:

### Projects

Projects data comes originally from Jira. We have found the Jira API can be too slow for us to fetch data from it each time a request is made to the API (partly because of the speed of Jira's API itself, partly because we may be making multiple calls and then combining the data received).

So instead we store a cached copy of projects data, in the format we use it in our API, in our own database (currently AirTable) so that we can deliver a fast response when someone calls our API. There are projects scripts that can be run as a cron job to regularly update our database from the Jira API.

The projects cron jobs also grab video thumbnail images from Vimeo and save them in AirTable, and updates AirTable with Vimeo/YouTube/other video webpage URLs.

### Events

There is also a cron job for events that have videos (these are usually past events - the videos are event recordings).

This job grabs video thumbnail images from Vimeo and saves them in AirTable.

## Services

### Slack

This file `/api/services/slack.js` allows you to post messages to Slack. If you want to enable posting to a new channel that we don't already post to, you need to:

1. [Create a Slack app](https://api.slack.com/start/planning) with a bot user, [approved by the owner of the Slack workspace](https://slack.com/intl/en-gb/help/articles/222386767-Manage-app-approval-for-your-workspace#h_01EC8H3AWBYEAAN5AKBTVKPC5K). This step has already been done, the Slack app is called ['Volunteer App'.](https://api.slack.com/apps/A03ALL3M137/general) If you don't have access to this, another member of the team can [add you as a 'collaborator'.](https://app.slack.com/app-settings/T011F5L41NH/A03ALL3M137/collaborators)

2. [Set up a webhook](https://api.slack.com/apps/A03ALL3M137/incoming-webhooks?) for the channel you want to post to. ([More info about Slack webhooks here.](https://api.slack.com/messaging/webhooks))

   > **Note:** this webhook URL must remain secret (don't share it openly, don't commit it to GitHub) as it enables anyone to post to that channel

3. Add the webhook as a variable in your `/api/.env` file (and in `/api/.env.example` but without the webhook URL itself). This variable must be named `SLACK_SECRET_WEBHOOK_` and then the name of the Slack channel, all in capitals and with hyphens replaced by underscores.
   > For example, if the Slack channel is called `my-awesome-channel`, the .env variable should be called `SLACK_SECRET_WEBHOOK_MY_AWESOME_CHANNEL`

## Logging errors

We use Bugsnag to log errors in the API when it's running on the production server.

Normally, we don't use this when we're running a local version of the API on a development server.  This is so that we don't get flooded by lots of errors that occur during development, and because we're on a free tier package that only allows a limited number of error reports per month so we want to minimise the errors reported to Bugsnag to only include issues in production.

You can force the API to report errors to Bugsnag from your local development server if needed.  To do this, update your `api/.env` file to include the line `BUGSNAG_ALWAYS_SEND_BUGS="true"` -- then stop and restart your API.  **It is very rare you would need to use this** -- don't use this in place of normal code tools like `console.error` and `console.log`  If you do use it, please remove this line from your .env file as soon as possible or set it to `BUGSNAG_ALWAYS_SEND_BUGS="false"`
