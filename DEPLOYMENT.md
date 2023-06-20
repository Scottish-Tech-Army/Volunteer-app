This file gives instructions for deploying the API to AWS, and the app to TestFlight (iOS) and the Google Play Store (Android).

- [Setup to deploy the app](#setup-to-deploy-the-app)
- [App deployment](#app-deployment)
- [API deployment on AWS](#api-deployment-on-aws)

# Setup to deploy the app

These are the one-time setup steps you need to do in order to get ready to deploy the app.

## Google Play Store (Android)

1. Ask Joanna to give you **Developer access to the STA Google Play Store account**. That will allow you to check whether releases you deploy have uploaded successfully, and you'll be able to add new testers.

## TestFlight / App Store (iOS)

2. Ask Joanna to give you **Developer access to the STA App Store Connect account** (you should be able to do this without having to pay for an Apple Developer account). You will need an Apple account ([create one here free if you don't have one](https://support.apple.com/en-gb/HT204316)) -- then you'll need to give Joanna the email address you use for your Apple ID. Getting access to App Store Connect is necessary in order to submit iOS versions of the app via Expo Application Services, and will allow you to check whether releases you submit have been uploaded successfully and accepted by Apple.

# App deployment

**All devs on the team can deploy the app** -- it should be something we all usually incorporate into any pull request where we make a change to the front-end app.

**There are two versions of the app we can deploy** -- one for internal testing (TestFlight for iOS, Google Play Store *internal track* for Android) and one for public release (App Store for iOS, Google Play Store *production track* for Android). The internal testing versions are for the Volunteer app team to download and test before we release the app to the public. The public release versions are for anyone to download from the app stores.

**We use [Expo Application Services (EAS)](https://expo.dev/eas)** to build and deploy the app. We are using the free tier which gives us 30 builds per calendar month (15 iOS, 15 Android -- so it's really 15 new deployments). This includes test builds (the Google Play test version and TestFlight) and production builds, it's all the same total.

## Changing the EAS configuration

This isn't something you should need to do often, but if you want to amend the EAS configuration there are a couple of places to look:

Some build and submit settings are in `app/eas.json`.

There are also settings in the main Expo config file `app/app.config.ts` -- look for the `eas` object, also the `android` and `ios` objects.

> Where you see `process.env.XXXXXXXXXX` references in `app/app.config.ts`, for the app build with Expo Application Services environment variables that are secret can be set [in our EAS account](https://expo.dev/accounts/scottishtecharmy/projects/volunteer-app/secrets) In cases where values are not secret and are not liable to change in the built app (e.g. the API `baseUrl` and `version`) these are set directly in the `app/app.config.ts` file (those `process.env.XXXXXXXXXX` variables are only used when you're running the app locally, getting values from your `app/.env` file).

> For builds, in EAS's terminology we use a 'production' profile for both testing and production versions of the app. (There are [other build options in EAS](https://docs.expo.dev/build/eas-json/) such as for 'internal' use, but those are not as well suited to uploading test versions that can be installed on any device.)

## Deployment process

**As a general rule you're strongly encouraged to deploy changes as part of any pull request that updates the front-end app** by following the steps below. **But we also just need to be careful not to hit the 15 deployments (30 builds)) limit,** so if there has been a high frequency of approved pull requests this month or your pull request is only a very minor change to the front-end app, you might not want to update the app version and do a new deployment.  If you're not sure, check [how many builds have already been done this month](https://expo.dev/accounts/scottishtecharmy/settings/billing) (and if you're still unsure ask the team on Slack).

### Screenshots

3. If you're making major design/functionality changes/additions, consider updating the screenshots we use in the Google Play Store and App Store. Store screenshots in the `screenshots/app` directory. You'll need to upload them manually in the Google Play Store console, and you'll need to ask Joanna to do the same in App Store Connect.

### Pull request

4. In the pull request for the changes you're making (e.g. a new app feature), before you submit the PR for review, update the `version` number in `app/package.json`. Normally for minor features/fixes, just update the last part of the version number (e.g. `"1.0.24"` becomes `"1.0.25"` -- [read more about semantic versioning](https://semver.org/)).

   > Version numbers for the MVP version of the app should begin with a `1`, version numbers for the MVP+1 version of the app should begin with a `2` etc.

5. Get your pull request approved as you normally would. When you're ready to merge your code and deploy the updated app, double-check the version numbers in the previous steps are still right compared to what's in `main` or the release branch (somebody else could have merged in code recently and changed the version numbers since you last checked - if you need to, update the version numbers before merging).

6. Go ahead and merge your pull request into `main` or the release branch.

### Build the Android version

7. Make sure you are on the right branch locally and have pulled the latest code before you go any further.

   > If you are deploying a production release, you should be on the `main` branch. If you are deploying a test release, you should be on a release branch.

   > Do `git pull` to make sure you have pulled the latest changes from GitHub, including the pull request you've merged in.

8. In the `app` directory run `npm run build-android` (it's the same command if you are creating a build either for internal testing or for production - releasing the app to the public)

   > If asked to install extra packages, say **yes**

   > If you aren't already logged into Expo Application Services (EAS), you'll be asked to login. Ask another team member for the STA's Expo Application Services login details.

   > If you get a message saying *EAS project not configured. Existing EAS project found for @scottishtecharmy/volunteer-app Configure this project?* Stop the build process. You need to add `EXPO_APPLICATION_SERVICES_PROJECT_ID` to your `app/.env` file. Ask another team member for the value of this variable.

   > If you get an error saying `Error reading Expo config ... Cannot find module 'dotenv/config'` you may need to reinstall the `dotenv` package.  In the `app` directory run `npx expo install dotenv` (if that doesn't fix it try `npm install dotenv`) (If you get warnings, but not errors, when reinstalling this package - don't worry.)

   > Builds can take some time (sometimes 10-20 minutes, sometimes more than an hour, depending on how busy EAS servers are), but you can check the exact status of a build and the different steps that are taking place in the Expo Application Services dashboard -- follow the URL you'll see in your terminal after you run one of the build commands below (ask another team member for the Expo Application Services login details). You can also see there if there are any errors.

9. Once the build is complete, ignore the QR code and if you get a message asking *Install and run the Android build on an emulator?* say **no**

### Submit to the Google Play Store

You've created an Android build and it's stored in the cloud with EAS.  Now we need to submit it to the Google Play Store.

10. Make sure you use the right submit command. If you want to **publish the app to the internal test track** (for the Volunteer app team only to download) use `npm run submit-android-testing` -- or to **publish the app to production** (for people to download publicly from the Google Play Store) use `npm run submit-android-production`

11. When asked *What would you like to submit?* choose *Select a build from EAS*. Then use arrow keys to choose the build from the list that you created with the build steps above, and press enter.

12. Wait for the build to be submitted.

13. Once it's finished, check in the [Google Play Console](https://play.google.com/console) that the new version of the app has successfully been added (*Volunteer app > Release > Internal testing* or *Volunteer app > Release > Production*) -- you should see the new version number next to 'Latest release' under 'Track summary'.

   > Google Play Store reviews the release before it's made public -- check the status of the release in the Google Play Console. If it's not yet available to download, check back later.

14. If you have an Android phone, download the updated version of the app ([see instructions](README.md#updating-to-the-latest-version-of-the-app)) and double check it's all working as expected.

### Build the iOS version

15. Make sure you are on the right branch locally and have pulled the latest code before you go any further.

   > If you are deploying a production release, you should be on the `main` branch. If you are deploying a test release, you should be on a release branch.

   > Do `git pull` to make sure you have pulled the latest changes from GitHub, including the pull request you merged in.

16. In the `app` directory run `npm run build-ios` (it's the same command if you are creating a build either for TestFlight internal testing or for production - releasing the app to the public)

   > The next few steps below cover iOS-specific issues. See also the notes under step 7. above (Android build) about logging into Expo Application Services (EAS), installing extra packages, and some other issues you might also run into during the iOS build process.

17. If asked *Do you want to log in to your Apple account?* say **yes.** Follow the steps to log into your account and when asked to select a Team and a Provider choose Scottish Tech Army.

   > If you get an error message similar to `Failed to register bundle identifier` or `Apple 403 detected - Access forbidden` try logging in to your [App Store Account](https://appstoreconnect.apple.com/) (or [App Developer account](https://developer.apple.com/) if you have one) -- look around in your account, there may be some updated terms and conditions you need to accept before you can try running the build command again. If you can't see anything you need to accept, it may be that Alistair needs to accept some new terms & conditions in his [Apple developer account]( https://developer.apple.com/account/) -- ask him (or ask Joanna to ask him) to check.

18. If asked if you want to generate a new Distribution Certificate and/or Provisioning Profile (if you've deployed recently you may not get asked this), say **yes**

19. If asked *Would you like to set up Push Notifications for your project?* say **no**

20. Wait for the build process to complete

### Submit to TestFlight / the App Store

You've created an iOS build and it's stored in the cloud with EAS.  Now we need to submit it to TestFlight / the App Store.

21. Make sure you use the right submit command. If you want to **publish the app to TestFlight for internal testing** (for the Volunteer app team only to download) use `npm run submit-ios-testing` -- or to **publish the app to production** (for people to download publicly from the App Store) use `npm run submit-ios-production`

22. When asked *What would you like to submit?* choose *Select a build from EAS*. Then use arrow keys to choose the build from the list that you created with the build steps above, and press enter.

23. Wait for the build to be submitted.

24. Check in [App Store Connect](https://appstoreconnect.apple.com/apps) that the new version of the app has successfully been uploaded and processed (Apps > STA Volunteer App > TestFlight or Apps > STA Volunteer App > App Store) -- you should see the new build number below the latest version.

   > Apple perform some automated checks on a build after it's been submitted, these can take 10-20 minutes. If you don't see your build appear in the list Apple might have found some problems with it. Check your email to see if you have a message from Apple, if not ask Joanna if she has.

   > Check that the new build (matching the build number in App Store Connect to the version number you set in `app/package.json` e.g. `1.0.25`) has been published. When we submitted the first version of the app Joanna had to submit it to the App Store manually for review -- this may need to happen again for new production releases.

25. If you submitted a test version of the app (for TestFlight), you have an iPhone and you're part of the iOS beta test group, you should get a notification on your phone from TestFlight that a new version is available to test. Download the updated version of the app to your iPhone ([see instructions](README.md#updating-to-the-latest-version-of-the-app)).

# API deployment on AWS

## Pull requests

Each time you update API code, before you submit your pull request for review, update the `version` number in `api/package.json`. Normally for minor features/fixes, just update the last part of the version number (e.g. `"1.0.24"` becomes `"1.0.25"` -- [read more about semantic versioning](https://semver.org/)).

> Version numbers for the MVP version of the app should begin with a `1`, version numbers for the MVP+1 version of the app should begin with a `2` etc.

Updating the version number helps us keep track of which version of the API is running on the server, [it's used by Bugsnag when errors are reported.](API_DEVELOPMENT.md#logging-errors)

## Automatic deployment with GitHub Actions

**API deployment is automatic whenever a Pull Request is merged into the `main` branch on GitHub -- you shouldn't need to do any manual deployment steps with the API.**

The relevant GitHub Action is cd_api.yml and relies on three [GitHub Actions Repository secrets](https://github.com/Scottish-Tech-Army/Volunteer-app/settings/secrets/actions):
- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` for user eb-dev in volapp-dev-test.
- `DEPLOY_ENV_FILE` contains a copy of the `api/.env` file.

Note: If environment variables have changed, the entire `api/.env` file should be pasted into `DEPLOY_ENV_FILE` in [our GitHub repo's Secrets.](https://github.com/Scottish-Tech-Army/Volunteer-app/settings/secrets/actions) **You need to be very careful with this step** -- there are some environment variables that will be different for the production server to what you have locally, or which don't exist in your local .env file:

- `AIRTABLE_PROJECTS_RESOURCES_CACHE_TABLE` should be different on the production server
- `BUGSNAG_API_KEY` should not usually be in your local .env file, but must be included on the production server
- `SLACK_CHANNEL_VOLUNTEER_PROJECT_INTEREST` should be different on the production server
- `SLACK_SECRET_WEBHOOK_INITIAL_TRIAGE` should not usually be in your local .env file, but must be included on the production server

> After you have added the updated .env values to GitHub Secrets, **if you amended your local .env file make sure you reset it back to the values you had before** for local development (e.g. `AIRTABLE_PROJECTS_RESOURCES_CACHE_TABLE` should be the test table name, not the production table name etc -- check all the the variables mentioned in the list above).

> Make sure the .env file you copy and paste from is all correctly formatted too: there should be no spaces before and after `=` signs, string values should be inside double quotes `"`, e.g. `BUGSNAG_API_KEY="abc123def456hij7890xxxxxxxx"`

If you need access to update secrets or make changes on AWS, reach out on [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel.

## Manual deployment to AWS

**You can force a manual deployment to AWS by triggering the GitHub action manually.** This could be useful if the API code hasn't changed (which would automatically trigger the GitHub action to deploy) but e.g. you've changed the environment variables (in the `DEPLOY_ENV_FILE` GitHub secret) and you want to deploy those changes. To do this:

1. Go to our repo's [GitHub Actions page](https://github.com/Scottish-Tech-Army/Volunteer-app/actions)

2. Choose **Deploy to Elastic Beanstalk** from the left-hand menu

3. Above the list of workflow runs, select the **Run workflow** dropdown.

4. Choose the branch (usually `main`)

5. Click the **Run workflow** button.

**You can also run through manual steps in AWS to deploy the API. The following instructions shouldn't normally need to be used -- they are only for if there's an issue with GitHub Actions.**

Ask David Calder in the [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel to give you AWS access. Once that's set up, you can log in to AWS here: https://scottishtecharmy.awsapps.com/start#/ You'll need to navigate to the management console for the volapp-dev-test account, change your region to London (eu-west-2), and navigate to Elastic Beanstalk.

In the volapp-dev-test account, an [Elastic Beanstalk](https://eu-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-2#/environments) environment called Volunteerapp-env has been created (manually for now).

You can connect your app to this environment by changing STA_BASE_URL to the load balancer address in `Volunteer-app/app/src/Config/index.ts`:

` STA_BASE_URL: 'https://the-sta.com',`

For support, please @ David Calder in the [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel

### Issues when updating manually

We've had some issues with the API breaking when we've tried to deploy changes to AWS.  For now, this is the recommended way to make sure you can deploy without worrying about breaking it, while we work on a better longer-term solution.

1. If you're completing a pull request, once it's approved merge in your latest changes to the `main` branch like you normally would.
2. Then, clone a **new, clean copy of the repo** into a new directory on your computer.  E.g. `git clone git@github.com:Scottish-Tech-Army/Volunteer-app.git volunteer-app-aws-deployment` will clone it into a directory called `volunteer-app-aws-deployment`.  You can call this directory whatever you want, the important thing is to clone a new copy separate from the directory you normally use when working on the app/API code -- this new directory is what we're going to use to deploy to AWS.
3. Set `AIRTABLE_PROJECTS_RESOURCES_CACHE_TABLE` to the name of the production table (instead of the test table) in `api/.env`.
4. Copy your `api/.env` file from your normal working directory into this new directory.
E.g. `cp Volunteer-app/api/.env volunteer-app-aws-deployment/api/.env` (but this command depends what directory you're in and what you've named these directories).  Check that the `.env` file now exists in the `api` directory of your new copy of the repo -- it's vital for the API to work.
5. **Don't do anything else in your new directory** (e.g. `volunteer-app-aws-deployment`).  Don't do `npm install` or `npm start` or anything else.
6. Go into the `api` directory of your new copy of the repo, e.g. `cd volunteer-app-aws-deployment/api`
7. In that `api` directory, zip it up into a file: `zip ../../myapp.zip -r * .[^.]*`  This `myapp.zip` file will be created in the directory above `volunteer-app-aws-deployment`
8. If you haven't already, [log into the STA AWS account here](https://scottishtecharmy.awsapps.com/start#/).
9. In the AWS Management Console navigate to [Elastic Beanstalk](https://eu-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-2#/environments).
10. In the [Volunteer App Application versions](https://eu-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-2#/application/versions?applicationName=volunteer-app), Upload the myapp.zip that you created in step 6.
11. Now select the version label you've just created and then select Action > Deploy
12. Go to the environment dashboard and check the version label has updated and the Health is OK. If not, check the Logs (menu on the left hand side) or ask someone else in the team for help.
13. Also check one of the API endpoints to make sure it's working, e.g. `https://the-sta.com/v1/projects` or `https://the-sta.com/v1/events` -- at least one of these should work.
14. Delete the new directory containing copy of the repo you made in step 2 and everything in it, e.g. `rm -rf volunteer-app-aws-deployment/`

**Note: If you end up with 502 errors it is almost certain that the .env file is missing or incorrect.**
