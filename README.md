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
4. autossh
   > This is used to tunnel your local API server so the app in Expo Go can connect to it.  There are [installation instructions here](https://www.everythingcli.org/ssh-tunnelling-for-fun-and-profit-autossh/#gfm-3)  (If you are on a Mac you'll need Brew to install autossh, if you don't have Brew [here's how to install that first](https://brew.sh/))
5. [Install the Expo Go app on your iOS or Android phone](https://expo.dev/client) -- when you're developing the app locally, you'll use Expo Go to test the app on your phone.  As part of this you'll need to [set up an Expo account](https://expo.dev/signup) if you don't have one already.

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

6. At the command prompt run `npm install` to install dependencies

> **Note** Inside the `api` folder there are files `package.json` and `package-lock.json`. Every time either of these is modified, it is advised to repeat this step before running the project.

7. Then run the command `npm start` to start the Volunteer App API server. You should see a message that says `Running scheduled cron jobs... ` and `Volunteer App API is listening on port <number> in development environment`.  Leave this terminal window open.

8. Open another terminal window and in this new window run the command `npm run tunnel`. This 'tunnels' your local API server: makes it available externally so your app running in Expo Go can access it (using a free external service called [Serveo](https://serveo.net/)).  You should see a message saying your `Forwarding HTTP traffic from: https://xxxxxxxxx.serveo.net` -- this is the URL of your local API server, make a note of it as you'll need it in a minute.

   > This URL should generally stay the same each time you run the tunnel command, but if you find it changes, you'll need to update the `STA_BASE_URL` value in your `app/src/Config/index.ts` file (see step 11 below). (There are paid services or more complicated solutions we could use which guarantee a fixed URL, but for now this feels like the best solution that's easy to use and free for all devs in the team.)

## App

9. Go to the `app` folder inside the project folder (e.g. **/path/to/Volunteer-app/app**)

10. At the command prompt type `npm install`

   > Inside the `app` folder there are files `package.json` and `package-lock.json`. **Every time either of these is modified, it is advised to repeat this step before running the project.**

   > **If you get *warnings* about installing dependencies** you probably don't worry about these

   > **If you get *errors* about installing dependencies** you may need to run `npm install --legacy-peer-deps` or `npm install --force` (instead of `npm install`)

11. Duplicate the example config file `app/src/Config/index.example.ts` and name your new file `app/src/Config/index.ts`  Set the value of `STA_BASE_URL` to the tunnelled URL of your local API server (the one you made a note of in step 8 above).

12. Run Expo using `npm start`  This will run some commands and then it show you a QR code in your terminal.

  > You may get an automatic prompt to install `@expo/ngrok` or another package -- if so, type `y` to install it.

  > If you get stuck at this stage, you might need to install `@expo/ngrok` manually, globally on your local machine: run `npm install -g @expo/ngrok` then try running `npm start` again.

13. Connect your phone:
- **iPhone:** open the camera and scan the QR code, tap on the link and it should open up the app in Expo Go
- **Android:** open the Expo Go app itself and you can scan the QR code
- You should now see your local development version of the app on your phone -- any changes you make in your code should show almost instantly on your phone.  (If you find you're not seeing changes on your phone or Expo Go loses the connection, [see tips here.](APP_DEVELOPMENT.md#expo-known-issues))

14. When you've got the app to run, make a PR to improve this README! Fix something that caused you headaches, update something that's no longer correct, or add a training resource, or add something else you think would help other people to get up and running.

# Troubleshooting

Below are some commonly encountered issues and possible ways to resolve them. If it still doesn't work, post in the [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel and someone will help you.

## The API won't run

- When I run `npm start` in the `api` folder, the server errors with code `EADDRINUSE`
  > It is likely there is an instance of a server running already. To end the old instance, in terminal put in:
  ``kill -9 `lsof -i:3000 -t` ``
  and try running the server again.

- I'm not sure if my local API is running and successfully 'tunnelling' (working via a public Serveo URL)
  > In the terminal window where you ran the `npm run tunnel` command, get the URL, then paste that URL into a web browser and add `/v1/projects` at the end -- if your local API is running and tunnelling successfully, you should see a JSON response with a list of projects. (If you don't see that, try the suggestion below, and also check the terminal window where you ran `npm start` and see if there are any error messages there.)

- When I run `npm run tunnel` in the `api` folder, I get an error message similar to `autossh: not found`
   > You need to install `autossh`, see [requirements above](#requirements-to-run-the-project)

## The app won't build

- When I run `npm install`, it fails with dependency resolution errors
  > Sometimes this happens when one or more of the project dependencies gets updated and is out of step with the others. Try running `npm install --legacy-peer-deps` or `npm install --force`.

- I can't get Expo started in my terminal when I run `npm start` in the `app` directory
   > You may get an automatic prompt to install `@expo/ngrok` or another package -- if so, type `y` to install it.

  > If you get stuck at this stage, you might need to install `@expo/ngrok` manually, globally on your local machine: run `npm install -g @expo/ngrok` then try running `npm start` again.

## The app gets stuck loading projects

- The app gets stuck on the Projects screen -- projects never load
  > Make sure the API is running on your local machine, and that your **api/.env** and **app/Config/index.ts** files are configured correctly (see [Setup and first run](#setup-and-first-run) above)

  > Make sure you have two terminal windows open running the API: one running `npm start` and one running `npm run tunnel` (see above), both are needed in order for the app to be able to connect to the API

  > Check if you can see data coming through from the API.  In the terminal window where you ran the `npm run tunnel` command, get the URL, then paste that URL into a web browser and add `/v1/projects` at the end -- if your local API is running and tunnelling successfully, you should see a JSON response with a list of projects. (If you don't see that, try the suggestion below, and also check the terminal window where you ran `npm start` and see if there are any error messages there.)

  > Has your tunnelled URL changed? Check what you see in the terminal window where you've run `npm run tunnel` and see if it's the same as the `STA_BASE_URL` value in your `app/src/Config/index.ts` file -- if not, you need to update that file then restart the app.

  > Your API tunnel might have fallen asleep (although `autossh` tries to prevent this) -- try stopping the process (press Ctrl+C) in the window where you ran `npm run tunnel`, then run that command again.

## The app builds, but crashes when I run it

- The app crashes with an error that says 'Metro has encountered an error: Cannot read properties of undefined (reading 'transformFile')'
  > Make sure you are using the LTS version of Node (currently v16); see [suggested solutions on StackOverflow](https://stackoverflow.com/questions/69647332/cannot-read-properties-of-undefined-reading-transformfile-at-bundler-transfo). If you want to keep your current version of Node as well, you can use tools such as [nvm (MacOS/Linux)](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage your Node installations.

- The app crashes with an opensslErrorStack: (error: 03000086)
  > Make sure you are using Node v16 LTS due to known conflicts on some devices between OpenSSL and Node v17+; see [suggested solutions on StackOverflow](https://stackoverflow.com/questions/74726224/opensslerrorstack-error03000086digital-envelope-routinesinitialization-e).

## The app in Expo Go isn't showing my changes or has lost connection

- [See the tips here](APP_DEVELOPMENT.md#expo-known-issues)

# Subsequent run

1. In a terminal window, go to the `api` folder inside the project folder (e.g. **/path/to/Volunteer-app/api**) and enter `npm start` to start the Volunteer App API server.

2. In a second terminal window, in the `api` folder enter `npm run tunnel` to tunnel your API server so the app in Expo Go can connect to it.

3. In a third terminal window, go to the `app` folder inside the project folder (e.g. **/path/to/Volunteer-app/app**) and enter `npm start` to run Expo

4. Connect your phone to your local development version of the app in Expo Go: 
- **iPhone:** open the camera and scan the QR code, this should open up the app in Expo Go
- **Android:** open the Expo Go app itself and you can scan the QR code
   > If you find you're not seeing changes on your phone or Expo Go loses the connection, [see tips here.](APP_DEVELOPMENT.md#expo-known-issues)

# Development

## Bugs

Ask one of the team to add you to the **it470-volunteer-app-errors** Slack channel where you can see crash and error reports coming via [Bugsnag](https://www.bugsnag.com).  Find out more about Bugsnag on the app and API development pages linked to below.

## App

[Please see here](APP_DEVELOPMENT.md) for more info on developing the front-end app, including more about React Native and Expo, and NativeBase.

## API

[Please see here](API_DEVELOPMENT.md) for more info on developing the back-end API.

# Deploying the app and API

The app is currently deployed for internal testing. We deploy the API to AWS, and for the app, we use [Fastlane](https://fastlane.tools/) to deploy to [TestFlight](https://developer.apple.com/testflight/) (iOS) and the [Google Play Store](https://play.google.com/) (Android). Deployment instructions can be found [here](DEPLOYMENT.md).

# Training resources

- [STA Vimeo Showcase - Volunteer App Training](https://vimeo.com/showcase/9205161) - recordings of STA training sessions relevant to the volunteer app
- [Learn React (official tutorial, beta version)](https://beta.reactjs.org/learn) - if you are new to working with React, this is a good place to start. (The tutorial on the non-beta site is ok but quite out of date; the beta version is mostly complete and much improved)
- [React Native docs](https://reactnative.dev/) - React, but for building cross-platform mobile apps
- [Express JS docs](https://expressjs.com/) - this is the framework used to build the API
- [React Native Boilerplate docs](https://thecodingmachine.github.io/react-native-boilerplate/) - the project template used to kickstart our app. The docs include lots of useful information about the project structure and what some of the dependencies are used for.
