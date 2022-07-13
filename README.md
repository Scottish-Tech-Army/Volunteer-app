- [Welcome](#welcome)
- [Requirements to run the project:](#requirements-to-run-the-project)
- [Setup and first run](#setup-and-first-run)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [AWS Deployment](#aws-deployment)
- [Training resources](#training-resources)


# Welcome

Welcome to the the Volunteering App Github repo

# Requirements to run the project:

1. Node.js LTS release
2. npm
   > npm usually is installed when Node.js is installed. type npm --version to check if it is installed after installing Node.js in Command Terminal
3. Go to the following link: https://reactnative.dev/docs/environment-setup - choose the 'React Native CLI Quickstart' tab, and follow the instructions for your platform

   > **Note** Where the instructions refer to a particular version of Android or the Android SDK platform, use **Android 10** and **SDK platform 29** instead of the more recent one.

   > **Note** You can skip the sections of the page that describe setting up and running a new project, since we already have one

# Setup and first run

1. Ensure that you've gone through the setup instructions at the following link for your particular platform: https://reactnative.dev/docs/environment-setup (see notes [above](#requirements-to-run-the-project))

2. Clone the code from GitHub:

   > `git clone https://github.com/Scottish-Tech-Army/Volunteer-app.git`

3. Open Command terminal

4. Go to the `api` folder inside the project folder (e.g. **/path/to/Volunteer-app/api**)

5. Copy the `.env.example` file in the api root folder and name your new file `.env` in the same folder. Fill in the empty values (`""`) in your file for any credentials/settings (API keys for STA Jira API access, AirTable, etc)

   > **Note** For security reasons, the credentials themselves are not provided here. Ask in the [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel when you join the dev group, and somebody will send them to you.

6. At the command prompt type `npm install` then `npm start` to start the Volunteer App API server. You should see a message that says `Volunteer App API is listening on port <number>` - make a note of the port number for later

7. Go to the `app` folder inside the project folder (e.g. **/path/to/Volunteer-app/app**)

8. At the command prompt type `npm install`

   > **Note** Inside the `app` folder there is `package-lock.json`. Everytime this is modified, it is advised to repeat step 6 before running the project.

   > **Note** you may need to run `npm install --legacy-peer-deps` or `npm install --force`

9. If you are on a Mac and want to run the iOS build of the app, go to the `app/ios` folder in a terminal window. At the command prompt type `pod install`

10. Duplicate the example config file `app/src/Config/index.example.ts` and name your new file `app/src/Config/index.ts`

    > **Note** If the app has difficulty connecting to the API, you may need to specify your private IP address and API port number in `app/src/Config/index.ts`. You can find your IP address by following the instructions for your platform [here](https://www.techbout.com/find-public-and-private-ip-address-44552/); you made a note of the API port number earlier. In the line `STA_BASE_URL: 'http://localhost:3000'`, replace `localhost` with your own IP, and if necessary, replace `3000` with the port number. For example, if your IP is 192.168.1.50 and the API is listening on port 3000, the line should now read `STA_BASE_URL: 'http://192.168.1.50:3000'`.

11. Type in command terminal: `npm run ios` or `npm run android`

12. When you've got the app to run, make a PR to improve this README! Fix something that caused you headaches, update something that's no longer correct, or add a training resource, or add something else you think would help other people to get up and running.

# Troubleshooting

Below are some commonly encountered issues and possible ways to resolve them. If it still doesn't work, post in the [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel and someone will help you.

## The app won't build

- When I run `npm install`, it fails with dependency resolution errors
  > Sometimes this happens when one or more of the project dependencies gets updated and is out of step with the others. Try running `npm install --legacy-peer-deps` or `npm install --force`.
- When I run `npm run android`, it fails and says that `ANDROID_HOME` is not set
  > Go to the [React Native setup guide](https://reactnative.dev/docs/environment-setup), choose the 'React Native CLI Quickstart' tab, choose your platform, and make sure that you've set the ANDROID_HOME environment variable as described there. You may need to restart your terminal window in order for the change to take effect.

## The app builds, but crashes when I run it

- The app gets stuck on the 'loading' screen
  > Make sure the API is running on your local machine, and that your **api/.env** and **app/Config/index.ts** files are configured correctly (see [Setup and first run](#setup-and-first-run) above. Make sure you have set your [IP address](https://www.techbout.com/find-public-and-private-ip-address-44552/) in **app/Config/index.ts** correctly; depending on your local network configuration, it may be subject to change between runs of the app.
- The app crashes with an error that says 'Metro has encountered an error: Cannot read properties of undefined (reading 'transformFile')'
  > Make sure you are using the LTS version of Node (currently v16); see [suggested solutions on StackOverflow](https://stackoverflow.com/questions/69647332/cannot-read-properties-of-undefined-reading-transformfile-at-bundler-transfo). If you want to keep your current version of Node as well, you can use tools such as [nvm (MacOS/Linux)](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage your Node installations.

# Subsequent run

1. Open Command terminal.

2. Go to the `api` folder inside the project folder (e.g. **/path/to/Volunteer-app/api**) and enter `npm start` to start the Volunteer App API server.

3. Go to the `app` folder inside the project folder (e.g. **/path/to/Volunteer-app/app**) and enter `npm run ios` or `npm run android`.

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

# AWS Deployment

June 2022:

In the volapp-dev-test account, an [Elastic Beanstalk](https://eu-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-2#/environments) environment called Volunteerapp-env has been created (manually for now).

You can connect your app to this environment by changing STA_BASE_URL to the load balancer address in `Volunteer-app/app/src/Config/index.ts`:

`  STA_BASE_URL: 'http://volunteerapp-env.eba-ivfm2tgp.eu-west-2.elasticbeanstalk.com',`

Note - as we move this into IaC and set up some build pipelines, things like env names, app names, domain names, IP Addresses will probably change.

For support, please @ David Calder in the [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel

## Updating the app
1. Git clone Scottish-Tech-Army/Volunteer-app to your computer
2. `cd Volunteer-app/api`
3. `zip ../myapp.zip -r * .[^.]*`
4. Go to the AWS Management Console and navigate to Elastic Beanstalk.
5. In [Application versions](https://eu-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-2#/application/versions?applicationName=volunteer-app), Upload the myapp.zip that you created in step 3.
6. Now select the version label you've just created and then select Action > Deploy
7. Go to the environment dashboard and check the version label has updated and the Health is OK. If not, check the Logs (menu on the left hand side).

## Known issues
* The iOS simulator only works with the IP Address of the Load Balancer as the value of STA_BASE_URL:
   * `  STA_BASE_URL: 'http://18.134.220.155',`
# Training resources

- [STA Vimeo Showcase - Volunteer App Training](https://vimeo.com/showcase/9205161) - recordings of STA training sessions relevant to the volunteer app
- [Learn React (official tutorial, beta version)](https://beta.reactjs.org/learn) - if you are new to working with React, this is a good place to start. (The tutorial on the non-beta site is ok but quite out of date; the beta version is mostly complete and much improved)
- [React Native docs](https://reactnative.dev/) - React, but for building cross-platform mobile apps
- [Express JS docs](https://expressjs.com/) - this is the framework used to build the API
