# API development

This file contains some tips and guidelines on building our back-end Node JS API.  Please keep adding to it!

- [Cron jobs](#cron-jobs)
  - [Projects](#projects)
  - [Events](#events)
- [Services](#services)
  - [Slack](#slack)
- [Logging errors](#logging-errors)
  - [Seeing Bugsnag reports](#seeing-bugsnag-reports)
  - [Logging to Bugsnag from your local API](#logging-to-bugsnag-from-your-local-api)

## Cron jobs

[Cron jobs](https://en.wikipedia.org/wiki/Cron) are bits of code that can run regularly in the background to carry out things that need to be done repeatedly on a schedule (rather than code that's triggered by a user request, like most of our API).

These are stored in the `/api/cron-jobs` directory. Please see instructions at the end of the [Subsequent run](#subsequent-run) section above on how to run these scripts.

We make use of cron jobs on the API server for a couple of things:

### Projects

Projects data comes originally from Jira. We have found the Jira API can be too slow for us to fetch data from it each time a request is made to the API (partly because of the speed of Jira's API itself, partly because we may be making multiple calls and then combining the data received).

So instead we store a cached copy of projects data, in the format we use it in our API, in our own database (currently AirTable) so that we can deliver a fast response when someone calls our API. There are projects scripts that can be run as a cron job to regularly update our database from the Jira API.

The projects cron jobs also grab video thumbnail images from Vimeo and save them in AirTable, and updates AirTable with Vimeo/YouTube/other video webpage URLs.

You can run the projects cron jobs manually by going to the `api` directory in your terminal and running `node cron-jobs/run-projects.js`

### Events

There is also a cron job for events that have videos (these are usually past events - the videos are event recordings).

This job grabs video thumbnail images from Vimeo and saves them in AirTable.

You can run the projects cron jobs manually by going to the `api` directory in your terminal and running `node cron-jobs/run-events.js`

## Services

### Slack

This file `/api/services/slack.js` allows you to post messages to Slack. If you want to enable posting to a new channel that we don't already post to, you need to:

1. [Create a Slack app](https://api.slack.com/start/planning) with a bot user, [approved by the owner of the Slack workspace](https://slack.com/intl/en-gb/help/articles/222386767-Manage-app-approval-for-your-workspace#h_01EC8H3AWBYEAAN5AKBTVKPC5K). This step has already been done, the Slack app is called ['Volunteer App'.](https://api.slack.com/apps/A03ALL3M137/general) If you don't have access to this, another member of the team can [add you as a 'collaborator'.](https://app.slack.com/app-settings/T011F5L41NH/A03ALL3M137/collaborators)

2. [Set up a webhook](https://api.slack.com/apps/A03ALL3M137/incoming-webhooks?) for the channel you want to post to. ([More info about Slack webhooks here.](https://api.slack.com/messaging/webhooks))

   > **Note:** this webhook URL must remain secret (don't share it openly, don't commit it to GitHub) as it enables anyone to post to that channel

3. Add the webhook as a variable in your `/api/.env` file (and in `/api/.env.example` but without the webhook URL itself). This variable must be named `SLACK_SECRET_WEBHOOK_` and then the name of the Slack channel, all in capitals and with hyphens replaced by underscores.
   > For example, if the Slack channel is called `my-awesome-channel`, the .env variable should be called `SLACK_SECRET_WEBHOOK_MY_AWESOME_CHANNEL`

4. Add this variable to the Volunteer-app/.github/workflows/ci_api.yml file, following the format of the variables already listed there. 
   > For example, the above .env variable would require the following entry at the bottom of the yml file: 
     SLACK_SECRET_WEBHOOK_MY_AWESOME_CHANNEL: ${{ secrets.SLACK_SECRET_WEBHOOK_MY_AWESOME_CHANNEL}}

5. Add this variable as a new [GitHub Actions Secret](https://github.com/Scottish-Tech-Army/Volunteer-app/settings/secrets/actions).

## Logging errors

We use Bugsnag to log errors in the API when it's running on the production server. To log errors to Bugsnag always use the `logError` function in `api/services/logging.js` instead of `console.error` (it calls `console.error` anyway as part of what it does).

(While you're developing and testing out your code, you can still use `console.log` and `console.error` to see errors in your terminal.)

**Normally, we don't log errors to Bugsnag when we're running a local version of the API on a development server.**  This is so that Bugsnag doesn't get flooded by lots of errors that occur during development (which don't actually need the team to fix - they're just part of one dev's work on a ticket), and because we're on a free tier package that only allows a limited number of error reports per day/month so we want to minimise the errors reported to Bugsnag to only include issues in production.

### Seeing Bugsnag reports

Ask one of the team to add you to the **it470-volunteer-app-errors** Slack channel where you can see the latest bugs coming in from the production server and the app.

To get more details on a bug you'll need to go to [our Bugsnag inbox here](https://app.bugsnag.com/scottish-tech-army/volunteer-app/errors) -- you'll need the login details from another team member.

  > Note: there are two Projects in Bugsnag -- one for the front-end app ('Volunteer app'), another for the API ('Volunteer app API'). Make sure you're looking at the right one. You can also filter by development/production.

  > When you look into an error, click on it in the Inbox in Bugsnag, then on the 'Stacktrace' tab you'll need to find where the error originated. The first entry in the stacktrace is just the `logging` module, you need to find what's below that and click to expand it to see where in the code the error actually occurred.

### Logging to Bugsnag from your local API

**It is very rare you would need to use this** but you can force the API to report errors to Bugsnag from your local development server if needed. (You would normally only use this on your local dev server if you need to check Bugsnag is working.) **Don't** use this in place of normal code tools like `console.error` and `console.log` and other normal testing approaches.

To do this:

- In your `api/.env` file add `BUGSNAG_API_KEY="insert_key_here"` replacing `insert_key_here` with the actual API key from Bugsnag (ask one of the team on Slack for the key -- note: the front-end app and the API use different Bugsnag API keys)
- Also in your `api/.env` file add the line `BUGSNAG_ALWAYS_SEND_BUGS="true"` (this forces the API to send errors to Bugsnag, even though you're in a development environment)
- Stop and restart your API (we have to do this to get Node to pick up changes in a `.env` file)

**After you've finished testing you must:**

- Remove the `BUGSNAG_ALWAYS_SEND_BUGS` line from your .env file or set it to `BUGSNAG_ALWAYS_SEND_BUGS="false"`
- Stop and restart your API (we have to do this to get Node to pick up changes in a `.env` file)
