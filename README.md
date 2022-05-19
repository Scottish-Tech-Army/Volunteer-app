- [Welcome](#welcome)
- [Requirements to run the project:](#requirements-to-run-the-project)
- [Setup and first run](#setup-and-first-run)
- [Development](#development)

# Welcome

Welcome to the the Volunteering App Github repo

# Requirements to run the project:
       
1. Node.js LTS release         
2. npm     
   >npm usually is installed when Node.js is installed. type npm --version to check if it is installed after installing Node.js in Command Terminal 
3. Ensure that you have read through for your particular platform: https://reactnative.dev/docs/environment-setup
4. Make sure that you have Android 10 installed and not higher.

# Setup and first run 

1. Ensure that you've gone through the following link for your particular platform: https://reactnative.dev/docs/environment-setup

2. Pull the code from Git

3. Open Command terminal

4. Go to the `api` folder inside the project folder (e.g. **\Volunteer-app path\api**)

5. Copy the `.env.example` file in the api root folder and name your new file `.env` in the same folder. Fill in the empty values (`""`) in your file for any credentials/settings (API keys for STA Jira API access, AirTable, etc).
    >**Note** Credentials themselves not provided, these should be requested/provided on joining the dev group.

6. At the command prompt type `npm install` then `npm start` to start the Volunteer App API server.

7. Go to the `app` folder inside the project folder (e.g. **\Volunteer-app path\app**)

8. At the command prompt type `npm install`
    >**Note:** Inside the `app` folder there is package-lock.json. Everytime this is modified, it is advised to repeat step 6 before  running the project.

    >**Note:** you may need to run `npm install --legacy-peer-deps`

9. If you are on a Mac, go to the `app/ios` folder in a terminal window. At the command prompt type `pod install`

10. Duplicate the example config file `app/src/Config/index.example.ts` and name your new file `app/src/Config/index.ts`
    >**Note** If the app has difficulty connecting to the API, you may need specify your IP address in `index.ts`. Replace `localhost` in the line `STA_BASE_URL: 'http://localhost:3000'` with your own.

11. type in command terminal: `npm run ios` or `npm run android`

# Subsequent run

1. Open Command terminal.

2. Go to the `api` folder inside the project folder (e.g. **\Volunteer-app path\api**) and enter `npm start` to start the Volunteer App API server.

3. Go to the `app` folder inside the project folder (e.g. **\Volunteer-app path\app**) and enter `npm run ios` or `npm run android`.

4. Optional: Update the cached projects/resources data from Jira *(during development, you probably only need to use this if you need the very latest data from Jira or you're actively testing the caching mechanism)*.  Open another command terminal window, go to the `api` folder inside the project.
    - If you want to manually update the cached data, enter this command: `node cache/run-projects.js`
        >During development, it's preferable to do this than to run the scheduled cron job described below.
    - If you want to automatically update the cached data regularly using a [cron job](https://en.wikipedia.org/wiki/Cron), enter this command instead: `node cache/run-cron-jobs.js`  Leave this terminal window open as long as you want this to keep running.
        >Be careful if using this during development: if multiple developers are running this simultaneously, these could conflict if more than one person is updating the same AirTable tables at the same time.
        
# Development

## API

### Caching

#### Projects

Projects data comes originally from Jira.  We have found the Jira API can be too slow for us to fetch data from it each time a request is made to the API (partly because of the speed of Jira's API itself, partly because we may be making multiple calls and then combining the data received).

So instead we store a cached copy of projects data, in the format we use it in our API, in our own database (currently AirTable) so that we can deliver a fast response when someone calls our API.  There are scripts in the `/api/cache` directory that can be run as a [cron job](https://en.wikipedia.org/wiki/Cron) to regularly update our database from the Jira API.

Please see instructions at the end of the [Subsequent run](#subsequent-run) section above on how to run these scripts.

### Services

#### Slack

This file `/api/services/slack.js` allows you to post messages to Slack.  If you want to enable posting to a new channel that we don't already post to, you need to:

1. [Create a Slack app](https://api.slack.com/start/planning) with a bot user, [approved by the owner of the Slack workspace](https://slack.com/intl/en-gb/help/articles/222386767-Manage-app-approval-for-your-workspace#h_01EC8H3AWBYEAAN5AKBTVKPC5K).  This step has already been done, the Slack app is called ['Volunteer App'.](https://api.slack.com/apps/A03ALL3M137/general)  If you don't have access to this, another member of the team can [add you as a 'collaborator'.](https://app.slack.com/app-settings/T011F5L41NH/A03ALL3M137/collaborators)

2. [Set up a webhook](https://api.slack.com/apps/A03ALL3M137/incoming-webhooks?) for the channel you want to post to.  ([More info about Slack webhooks here.](https://api.slack.com/messaging/webhooks))
    >**Note:** this webhook URL must remain secret (don't share it openly, don't commit it to GitHub) as it enables anyone to post to that channel

3. Add the webhook as a variable in your `/api/.env` file (and in `/api/.env.example` but without the webhook URL itself).  This variable must be named `SLACK_SECRET_WEBHOOK_` and then the name of the Slack channel, all in capitals and with hyphens replaced by underscores.
    >For example, if the Slack channel is called `my-awesome-channel`, the .env variable should be called `SLACK_SECRET_WEBHOOK_MY_AWESOME_CHANNEL`
