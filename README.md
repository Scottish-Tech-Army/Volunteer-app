- [Welcome](#welcome)
- [Download the app!](#download-the-app)
- [Updating to the latest version of the app](#updating-to-the-latest-version-of-the-app)
- [Requirements to run the project:](#requirements-to-run-the-project)
- [Setup and first run](#setup-and-first-run)
- [Troubleshooting](#troubleshooting)
- [Subsequent run](#subsequent-run)
- [Development](#development)
- [Deploying the app and API](#deploying-the-app-and-api)
- [Training resources](#training-resources)

# Welcome

Welcome to the the Volunteering App Github repo

# Download the app!

Get the test version of the app on your own phone so you can see it working in practice.

## iOS

Ask Joanna on Slack to set you up, you'll get an email invitation to download TestFlight and install the app from there.

## Android

Ask the team on Slack - one of the dev team needs to go to [the Google Play Console](https://play.google.com/console) > Volunteer app > Release > Testing > Internal testing, then they'll add your email address to the 'STA Volunteer App' Testers group (NB this must be the email address you use for the Google Play account on your phone).

Once that's done, you go to [this page](https://play.google.com/apps/internaltest/4701609055165574724) and follow instructions to download the app.

# Updating to the latest version of the app

The app is being updated regularly and while it's in private testing your phone won't automatically download the latest version. Here's what you do to get the latest version:

## iOS

If you are in the Beta test group and you have the Test Flight App installed on your phone, you should receive an email and a push notification that a new version is available. In the TestFlight app Tap the **Update** button next to the STA Volunteer App to download the new version (pull down to refresh if you don't see the new update).

You can also install previous builds if you tap on the **STA Volunteer App** > **App Information** > **Previous Builds**. Note: Test Flight builds expire after about 90 days, so you won't be able to download them if they are older.

If you're not in the Beta test group, reach out to Joanna who can add you.

## Android

On your phone, go to the Play Store page from the app itself -- long press on the icon, choose App Info, then App details in store. Then if you see an 'Update' button click that to install the latest version on your device.

Alternatively, you can go to the link in the instructions above for installing the Android app, then to the Google Play Store page it takes you to. If there's an 'Update' button there click that to install the latest version on your device.

# Requirements to run the project:

1. Node.js LTS release ([the 'ACTIVE' version here](https://nodejs.dev/en/about/releases/))
2. npm
   > npm usually is installed when Node.js is installed. Run the command `npm --version` to check if it is installed after installing Node.js in Command Terminal
3. npx
   > Once you have npm, run the command `npx --version` to check if npx is installed. If that doesn't work, you can install npx with the command `npm install -g npx`
4. [Install the Expo Go app on your iOS or Android phone](https://expo.dev/client) -- when you're developing the app locally, you'll use Expo Go to test the app on your phone.  As part of this you'll need to [set up an Expo account](https://expo.dev/signup) if you don't have one already.

# Code editor

You can develop on your local machine.

Or if you want, you can use a cloud-based alternative like [GitHub Codespaces](https://github.com/features/codespaces) (this might be good if you have a very slow laptop for instance).  With a free GitHub plan you get up to 60 hours a month of development time in Codespaces (which is probably plenty to volunteer on this project!)  You can [start a codespace here](https://github.com/codespaces) -- use the Blank template.

## Visual Studio Code

If you're using Visual Studio Code for development, it's recommended that you:

- Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Enable formatting on save](https://scottsauber.com/2017/06/10/prettier-format-on-save-never-worry-about-formatting-javascript-again/). Combined with ESLint and Prettier, this takes care of some code style issues such as formatting, indentation and semicolon consistency for you automatically.

# Setup and first run

1. Ensure that you've gone through the setup instructions above

2. Clone the code from GitHub:

   > Using SSH do `git clone git@github.com:Scottish-Tech-Army/Volunteer-app.git` or using https do `git clone https://github.com/Scottish-Tech-Army/Volunteer-app.git`

3. Open your terminal

## API

4. Go to the `api` folder inside the project folder (e.g. **/path/to/Volunteer-app/api**)

5. Copy the `.env.example` file in the api root folder and name your new file `.env` in the same folder -- e.g. using the command `cp .env.example .env` Fill in the empty values (`""`) in your file for any credentials/settings (API keys for STA Jira API access, AirTable, etc)

   > **For security reasons, the credentials themselves are not provided here.** Ask in the [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel when you join the dev group, and somebody will send them to you.

   > **The variable `API_TUNNEL_SUBDOMAIN` is different to all the others -- it's personal to you.**  For this value, you should enter your own name in lowercase with only dashes in between, followed by a random string of letters and numbers.  (Your local API will be exposed externally so this makes it a little harder for a bot or hacker to find.)  For example if your name is Nadia Bloggs: `API_TUNNEL_SUBDOMAIN="nadia-bloggs-dfkjhdfkj3847594385ksjksd"`
   (Don't use the random numbers and letters above, make up your own 🙂)

   > **Do not use any comments in your `api/.env` file** (it's technically possible to put comments using the `#` character, but this causes problems for the API tunnel command we're going to use below)

6. At the command prompt run `npm install` to install dependencies

> **Note** Inside the `api` folder there are files `package.json` and `package-lock.json`. Every time either of these is modified, it is advised to repeat this step before running the project.

7. Then run the command `npm start` to start the Volunteer App API server. You should see a message that says `Running scheduled cron jobs... ` and `Volunteer App API is listening on port <number>`.  Leave this terminal window open.

8. Open another terminal window and in this new window run the command `npm run tunnel-linux` (if you are on a Mac or Linux) or `npm run tunnel-windows` (if you are on Windows). This 'tunnels' your local API server: makes it available externally so your app running in Expo Go can access it.  You should see a message saying your `your url is: https://.............` -- this is the URL of your local API server, make a note of it as you'll need it in a minute.

   > This URL should include the value you set for `API_TUNNEL_SUBDOMAIN` in your `api/.env` file, e.g. something like `https://nadia-bloggs-dfkjhdfkj3847594385ksjksd.loca.lt`

   > **If you get an error message `export: #: bad variable name`** that's because you have a comment in your `api/.env` file.  Remove the comment and try again.

## App

9. Go to the `app` folder inside the project folder (e.g. **/path/to/Volunteer-app/app**)

10. At the command prompt type `npm install`

   > Inside the `app` folder there are files `package.json` and `package-lock.json`. **Every time either of these is modified, it is advised to repeat this step before running the project.**

   > **If you get an error about installing dependencies** you may need to run `npm install --legacy-peer-deps` or `npm install --force` (instead of `npm install`)

11. Duplicate the example config file `app/src/Config/index.example.ts` and name your new file `app/src/Config/index.ts`  Set the value of `STA_BASE_URL` to the tunnelled URL of your local API server (the one you made a note of in step 8 above).

12. Run Expo using `npm start`  This will run some commands and then it show you a QR code in your terminal.

13. Connect your phone:
- **iPhone:** open the camera and scan the QR code, tap on the link and it should open up the app in Expo Go
- **Android:** open the Expo Go app itself and you can scan the QR code
- You should now see your local development version of the app on your phone -- any changes you make in your code should show almost instantly on your phone.  (If you find you're not seeing changes on your phone or Expo Go loses the connection, [see tips here.](APP_DEVELOPMENT.md#expo-known-issues))

14. When you've got the app to run, make a PR to improve this README! Fix something that caused you headaches, update something that's no longer correct, or add a training resource, or add something else you think would help other people to get up and running.

# Troubleshooting

Below are some commonly encountered issues and possible ways to resolve them. If it still doesn't work, post in the [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel and someone will help you.

## The API won't run

- When I run `npm start` in `/api` folder, the server errors with code `EADDRINUSE`
  > It is likely there is an instance of a server running already. To end the old instance, in terminal put in:
  ``kill -9 `lsof -i:3000 -t` ``
  and try running the server again.
- When I run  `npm run tunnel-linux` or `npm run tunnel-windows` in `/api` folder, I get an error message `export: #: bad variable name`
   > That's probably because you have a comment (beginning with `#`) in your `api/.env` file.  Remove the comment and try again.

## The app won't build

- When I run `npm install`, it fails with dependency resolution errors
  > Sometimes this happens when one or more of the project dependencies gets updated and is out of step with the others. Try running `npm install --legacy-peer-deps` or `npm install --force`.

## The app builds, but crashes when I run it

- The app gets stuck on the 'loading' screen
  > Make sure the API is running on your local machine, and that your **api/.env** and **app/Config/index.ts** files are configured correctly (see [Setup and first run](#setup-and-first-run) above)
  > Make sure you have two terminal windows open running the API: one running `npm start` and one running `npm run tunnel-linux` or `npm run tunnel-windows` (see above), both are needed in order for the app to be able to connect to the API
- The app crashes with an error that says 'Metro has encountered an error: Cannot read properties of undefined (reading 'transformFile')'
  > Make sure you are using the LTS version of Node (currently v16); see [suggested solutions on StackOverflow](https://stackoverflow.com/questions/69647332/cannot-read-properties-of-undefined-reading-transformfile-at-bundler-transfo). If you want to keep your current version of Node as well, you can use tools such as [nvm (MacOS/Linux)](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage your Node installations.
- The app crashes with an opensslErrorStack: (error: 03000086)
  > Make sure you are using Node v16 LTS due to known conflicts on some devices between OpenSSL and Node v17+; see [suggested solutions on StackOverflow](https://stackoverflow.com/questions/74726224/opensslerrorstack-error03000086digital-envelope-routinesinitialization-e).

## The app in Expo Go isn't showing my changes or has lost connection

- [See the tips here](APP_DEVELOPMENT.md#expo-known-issues)

# Subsequent run

1. Open Command terminal.

2. Go to the `api` folder inside the project folder (e.g. **/path/to/Volunteer-app/api**) and enter `npm start` to start the Volunteer App API server.

3. In a separate terminal window, in the `api` folder enter `npm run tunnel-linux` or `npm run tunnel-windows` to tunnel your API server so the app in Expo Go can connect to it.

4. Go to the `app` folder inside the project folder (e.g. **/path/to/Volunteer-app/app**) and enter `npm start` to run Expo

5. Connect your phone to your local development version of the app in Expo Go: 
- **iPhone:** open the camera and scan the QR code, this should open up the app in Expo Go
- **Android:** open the Expo Go app itself and you can scan the QR code
   > If you find you're not seeing changes on your phone or Expo Go loses the connection, [see tips here.](APP_DEVELOPMENT.md#expo-known-issues)

# Development

## App

[Please see here](APP_DEVELOPMENT.md) for more info on developing the front-end app, including more about React Native and Expo, and NativeBase.

## API

### Cron jobs

[Cron jobs](https://en.wikipedia.org/wiki/Cron) are bits of code that can run regularly in the background to carry out things that need to be done repeatedly on a schedule (rather than code that's triggered by a user request, like most of our API).

These are stored in the `/api/cron-jobs` directory. Please see instructions at the end of the [Subsequent run](#subsequent-run) section above on how to run these scripts.

We make use of cron jobs on the API server for a couple of things:

#### Projects

Projects data comes originally from Jira. We have found the Jira API can be too slow for us to fetch data from it each time a request is made to the API (partly because of the speed of Jira's API itself, partly because we may be making multiple calls and then combining the data received).

So instead we store a cached copy of projects data, in the format we use it in our API, in our own database (currently AirTable) so that we can deliver a fast response when someone calls our API. There are projects scripts that can be run as a cron job to regularly update our database from the Jira API.

The projects cron jobs also grab video thumbnail images from Vimeo and save them in AirTable, and updates AirTable with Vimeo/YouTube/other video webpage URLs.

#### Events

There is also a cron job for events that have videos (these are usually past events - the videos are event recordings).

This job grabs video thumbnail images from Vimeo and saves them in AirTable.

### Services

#### Slack

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

# Deploying the app and API

The app is currently deployed for internal testing. We deploy the API to AWS, and for the app, we use [Fastlane](https://fastlane.tools/) to deploy to [TestFlight](https://developer.apple.com/testflight/) (iOS) and the [Google Play Store](https://play.google.com/) (Android). Deployment instructions can be found [here](DEPLOYMENT.md).

# Training resources

- [STA Vimeo Showcase - Volunteer App Training](https://vimeo.com/showcase/9205161) - recordings of STA training sessions relevant to the volunteer app
- [Learn React (official tutorial, beta version)](https://beta.reactjs.org/learn) - if you are new to working with React, this is a good place to start. (The tutorial on the non-beta site is ok but quite out of date; the beta version is mostly complete and much improved)
- [React Native docs](https://reactnative.dev/) - React, but for building cross-platform mobile apps
- [Express JS docs](https://expressjs.com/) - this is the framework used to build the API
- [React Native Boilerplate docs](https://thecodingmachine.github.io/react-native-boilerplate/) - the project template used to kickstart our app. The docs include lots of useful information about the project structure and what some of the dependencies are used for.
