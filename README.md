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

1. Node.js LTS release
2. npm
   > npm usually is installed when Node.js is installed. type npm --version to check if it is installed after installing Node.js in Command Terminal
3. Go to the following link: https://reactnative.dev/docs/environment-setup - choose the 'React Native CLI Quickstart' tab, and follow the instructions for your platform

   > **Note** Where the instructions refer to a particular version of Android or the Android SDK platform, use **Android 10** and **SDK platform 29** instead of the more recent one.

   > **Note** You can skip the sections of the React Native docs that describe setting up and running a new project, since we already have one.

   > **Note** The instructions specify recommended Ruby version as v2.7.6. Please note the Volunteer app runs successfully on Ruby v2.7.3.

# Setup and first run

1. Ensure that you've gone through the setup instructions at the following link for your particular platform: https://reactnative.dev/docs/environment-setup (see notes [above](#requirements-to-run-the-project))

2. Clone the code from GitHub:

   > `git clone https://github.com/Scottish-Tech-Army/Volunteer-app.git`

3. Open Command terminal

4. Go to the `api` folder inside the project folder (e.g. **/path/to/Volunteer-app/api**)

5. Copy the `.env.example` file in the api root folder and name your new file `.env` in the same folder. Fill in the empty values (`""`) in your file for any credentials/settings (API keys for STA Jira API access, AirTable, etc)

   > **Note** For security reasons, the credentials themselves are not provided here. Ask in the [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel when you join the dev group, and somebody will send them to you.

6. At the command prompt type `npm install` then `npm start` to start the Volunteer App API server. You should see a message that says `Volunteer App API is listening on port <number>` - make a note of the port number for later.

> **Note** Inside the `api` folder there are files `package.json` and `package-lock.json`. Everytime either of these is modified, it is advised to repeat this step before running the project.

7. Go to the `app` folder inside the project folder (e.g. **/path/to/Volunteer-app/app**)

8. At the command prompt type `npm install`

   > **Note** Inside the `app` folder there are files `package.json` and `package-lock.json`. Everytime either of these is modified, it is advised to repeat this step before running the project.

   > **Note** you may need to run `npm install --legacy-peer-deps` or `npm install --force`

9. If you are on a Mac and want to run the iOS build of the app, go to the `app/ios` folder in a terminal window. At the command prompt type `bundle install` followed by `pod install`.
   > **Note** If the dependencies in `/api` or `/app` folders have been updated, the pods might need reinstalled as follows:

       pod deintegrate
       rm -rf Pods/
       pod setup
       pod install


10. If you're using Visual Studio Code for development, it's recommended that you install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension and enable formatting on save. This takes care of some code style issues such as formatting, indentation and semicolon consistency for you automatically.

11. Duplicate the example config file `app/src/Config/index.example.ts` and name your new file `app/src/Config/index.ts`

    > **Note** If the app has difficulty connecting to the API, you may need to specify your private IP address and API port number in `app/src/Config/index.ts`. The IP address settings may vary depending on the setup of your dev machine and local network. There are various different IP settings that have worked for others, which include: `10.0.2.2` ([a special alias that the Android emulator uses for your dev machine](https://developer.android.com/studio/run/emulator-networking)); the private IP of the local dev machine; and the private IP of the default gateway for your network. You made a note of the API port number earlier. In the line `STA_BASE_URL: 'http://localhost:3000'`, replace `localhost` with your own IP, and if necessary, replace `3000` with the port number.

    > **Help** You can find the IP addresses for your dev machine and default gateway by following the instructions for your platform [here](https://www.techbout.com/find-public-and-private-ip-address-44552/).\
    **Example** If your computer's private IP is 192.168.1.50 and the API is listening on port 3000, the line should now read `STA_BASE_URL: 'http://192.168.1.50:3000'`.

12. Type in command terminal: `npm run ios` or `npm run android`

13. When you've got the app to run, make a PR to improve this README! Fix something that caused you headaches, update something that's no longer correct, or add a training resource, or add something else you think would help other people to get up and running.

# Troubleshooting

Below are some commonly encountered issues and possible ways to resolve them. If it still doesn't work, post in the [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel and someone will help you.

## The app won't build

- When I run `npm install`, it fails with dependency resolution errors
  > Sometimes this happens when one or more of the project dependencies gets updated and is out of step with the others. Try running `npm install --legacy-peer-deps` or `npm install --force`.
- When I run `npm run android`, it fails and says that `ANDROID_HOME` is not set
  > Go to the [React Native setup guide](https://reactnative.dev/docs/environment-setup), choose the 'React Native CLI Quickstart' tab, choose your platform, and make sure that you've set the ANDROID_HOME environment variable as described there. You may need to restart your terminal window in order for the change to take effect.
- When I run `npm run android`, it fails with `java.lang.OutOfMemoryError` somewhere in the error messages
  > Find the `.gradle` directory on your computer -- it may be a hidden directory, it will be outside of your Volunteer app directory, maybe in your home directory at e.g. `~/.gradle`  In that directory, create a new file `gradle.properties`, add this line to it `org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8` and save the file.  This tells the Android Java build process how much memory to use.  Try running `npm run android` again.  If you still get the same error, try increasing `2048` to a higher number (normally multiples of 1024 or 2048, e.g. `4096`).
- When I run `npm run android`, it fails and says `com.android.ddmlib.InstallException: INSTALL_FAILED_VERSION_DOWNGRADE`
  > This happens when you have installed a newer version of the app (in terms of Android version numbers) on your emulator and then you switch back to an older version.  (For example, maybe you were preparing to [deploy](DEPLOYMENT.md) a new version of the app on one branch, then you switched to another branch and tried to run that older version.)  With your Android emulator open, run the command `adb uninstall org.scottishtecharmy.volunteerapp` to uninstall the app from your emulator.  Then run `npm run android` again and it should work.
- When I run `npm start` in `/api` folder, the server errors with code `EADDRINUSE`
  > It is likely there is an instance of a server running already. To end the old instance, in terminal put in:
  ``kill -9 `lsof -i:3000 -t` ``
  and try running the server again.

## The app builds, but crashes when I run it

- The app gets stuck on the 'loading' screen
  > Make sure the API is running on your local machine, and that your **api/.env** and **app/Config/index.ts** files are configured correctly (see [Setup and first run](#setup-and-first-run) above)
- The app crashes with an error that says 'Metro has encountered an error: Cannot read properties of undefined (reading 'transformFile')'
  > Make sure you are using the LTS version of Node (currently v16); see [suggested solutions on StackOverflow](https://stackoverflow.com/questions/69647332/cannot-read-properties-of-undefined-reading-transformfile-at-bundler-transfo). If you want to keep your current version of Node as well, you can use tools such as [nvm (MacOS/Linux)](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage your Node installations.
- The app crashes with an opensslErrorStack: (error: 03000086)
  > Make sure you are using Node v16 LTS due to known conflicts on some devices between OpenSSL and Node v17+; see [suggested solutions on StackOverflow](https://stackoverflow.com/questions/74726224/opensslerrorstack-error03000086digital-envelope-routinesinitialization-e).
# Subsequent run

1. Open Command terminal.

2. Go to the `api` folder inside the project folder (e.g. **/path/to/Volunteer-app/api**) and enter `npm start` to start the Volunteer App API server.

3. Go to the `app` folder inside the project folder (e.g. **/path/to/Volunteer-app/app**) and enter `npm run ios` or `npm run android`.

   > **On Android,** if you get an error message that includes `INSTALL_FAILED_UPDATE_INCOMPATIBLE` this may be because you previously installed a newer version of the app for your emulator (e.g. on a new branch or testing someone else's pull request) then you switched back to an earlier version. Uninstall the app from your emulator with the command `adb shell pm uninstall org.scottishtecharmy.volunteerapp` then run `npm run android` again.

# Development

## App

[Please see here](APP_DEVELOPMENT.md) for more info on developing the front-end app, including NativeBase.

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
