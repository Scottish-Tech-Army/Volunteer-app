This file gives instructions for deploying the API to AWS, and the app to TestFlight (iOS) and the Google Play Store (Android).

- [Setup to deploy the app](#setup-to-deploy-the-app)
- [API deployment on AWS](#api-deployment-on-aws)
- [App deployment](#app-deployment)

# Setup to deploy the app

This is how you get set up ready to deploy the app to the Google Play Store (for Android) and TestFlight (for iOS) later, using [Fastlane](https://fastlane.tools/).

You don't need to worry about doing this section until you've gone through all the setup steps in the [README](README.md) and you've solved any headaches getting the API and the app running locally.

**If you're on a Mac** you can deploy the Android and iOS versions of the app.

**If you're on Windows/Linux** you can only deploy the Android version of the app (you'll always need to get another team member with a Mac to deploy the iOS version).

1. Install Fastlane: [Mac instructions in the 'Installing Fastlane' section here](https://thecodingmachine.github.io/react-native-boilerplate/docs/BetaBuild/#installing-fastlane) - [Windows/Linux instructions here](https://docs.fastlane.tools/getting-started/android/setup/)

   ## Google Play Store (Android)

2. Add `key.json` and `my-release-key.keystore` files into the `/app/android/` directory. These files contain credentials for uploading the app to the Google Play Store. Ask on Slack for another developer in the team to send you these files. Also ask them for the password for the `my-release-key.keystore` file -- save this somewhere safe (e.g. [a password manager](https://www.techradar.com/uk/best/password-manager)), you'll need it in the future to deploy the app.

   > Because these files contain sensitive access credentials we should never commit them to GitHub as our repository is open-source, anyone can see it.

   > On some systems, the terminal has a problem if the password for `my-release-key.keystore` contains symbols, so this password may need to be letters and numbers only (just make sure it's a long, strong password). If you need to change the password locally you can use this command `keytool -storepasswd -keystore path/to/my-release-key.keystore -storetype PKCS12`

3. Ask Joanna to give you Developer access to the STA Google Play Store account. That will allow you to check whether releases you deploy have uploaded successfully, and you'll be able to add new testers.

## TestFlight (iOS)

4. Ask Joanna to give you Developer access to the STA App Store Connect account. This will allow you to make a build and send it to Test Flight and check whether releases you deploy have uploaded successfully.

5. Duplicate the `app/.env.example` file and name it `app/.env` then add your App Store Connect email address in place of the example one in the `APPLE_ID` variable.

# API deployment on AWS

## Automatic deployment with GitHub Actions

API deployment is automatic whenever a Pull Request is merged into Main on GitHub.

The relevant GitHub Action is cd_api.yml and relies on three GitHub Actions Repository secrets:
- AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY for user eb-dev in volapp-dev-test.
- DEPLOY_ENV_FILE contains a copy of the .env file.

Note: If environment variables have changed, the entire .env file should be pasted into DEPLOY_ENV_FILE

If you need access to update secrets or make changes on AWS, reach out on [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel.

## Manual deployment to AWS

**This section is only for information, should there be an issue with GitHub Actions**

Ask David Calder in the [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel to give you AWS access. Once that's set up, you can log in to AWS here: https://scottishtecharmy.awsapps.com/start#/ You'll need to navigate to the management console for the volapp-dev-test account, change your region to London (eu-west-2), and navigate to Elastic Beanstalk.

In the volapp-dev-test account, an [Elastic Beanstalk](https://eu-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-2#/environments) environment called Volunteerapp-env has been created (manually for now).

You can connect your app to this environment by changing STA_BASE_URL to the load balancer address in `Volunteer-app/app/src/Config/index.ts`:

` STA_BASE_URL: 'https://the-sta.com',`

Note - as we move this into IaC and set up some build pipelines, things like env names, app names, domain names, IP Addresses will probably change.

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
13. Also check one of the API endpoints to make sure it's working, e.g. `http://volunteerapp-env.eba-ivfm2tgp.eu-west-2.elasticbeanstalk.com/projects` or `http://18.134.220.155/projects` -- at least one of these should work.
14. Delete the new directory containing copy of the repo you made in step 2 and everything in it, e.g. `rm -rf volunteer-app-aws-deployment/`

**Note: If you end up with 502 errors it is almost certain that the .env file is missing or incorrect.**

# App deployment

**If you're on a Mac** you can deploy the Android and iOS versions of the app.

**If you're on Windows/Linux** you can only deploy the Android version of the app (you'll always need to get another team member with a Mac to deploy the iOS version).

1. In the pull request for the changes you're making (e.g. a new app feature), before you submit the PR for review, update the `version` number in `app/package.json`. Normally for minor features/fixes, just update the last part of the version number (e.g. `"1.0.24"` becomes `"1.0.25"`).

2. Add changelog notes - a quick summary (a line or two will usually do) of what this new version does (NB the public will see these notes in the Play Store / App Store, so keep them easy to understand and relevant to app users). These should be added to the 'Unreleased' section of [app/android/CHANGELOG.md](app/android/CHANGELOG.md). You may wish to use the structure suggested by the [Keep a Changelog](https://keepachangelog.com/) project, and use subheadings to indicate additions, changes, fixes, etc.

3. If updating the Android version, navigate to the `app/android` directory and run `fastlane pre_beta`. This will update the Android version code (a unique build number), generate a version-specific changelog (`app/android/app/fastlane/metadata/android/en-GB/changelogs/<versionCode>.txt`) from your updates in CHANGELOG.md, and update CHANGELOG.md to move the unreleased changes to the new version.

4. Get your pull request approved as you normally would. When you're ready to merge your code into the `main` branch and deploy the updated app, double-check your version numbers in the previous steps are still right compared to what's in `main` (somebody else could have merged in code recently and changed the version numbers since you last checked - if you need to, update the version numbers before merging).

5. In `/app/src/Config/index.ts` set `STA_BASE_URL` to point to the external URL for [the API endpoint on AWS](#api-deployment-on-aws) -- not to your localhost or its IP address, otherwise the app won't be able to connect to the API when it's installed on someone's phone.

   ## Google Play Store (Android)

6. Go to the `/app/android` directory in a terminal window and run the command `fastlane beta`. You'll be prompted twice at the beginning for passwords -- both are the password you got for the `my-release-key.keystore` file in the [Setup to deploy the app section](#setup-to-deploy-the-app) above.

   > The process can take a while (sometimes 30 minutes or more)! If it fails, try [the troubleshooting tips here](https://thecodingmachine.github.io/react-native-boilerplate/docs/BetaBuild/#troubleshooting), see [Google Play Store known issues](#google-play-store-known-issues) below or ask for help on the team Slack channel if you can't figure it out.

7. If you have access, check in the [Google Play Console](https://play.google.com/console) that the new version of the app has successfully been added (Volunteer app > Release > Internal testing) -- you should see the new version number next to 'Latest release' under 'Track summary'.

8. Download the updated version of the app to your Android phone ([see download instructions](#download-the-app) near the top of this README). On the Google Play Store screen, there should be an 'Update' button to download the latest version of the app to your device.

   ### Google Play Store known issues

   - If you encounter an error containing `Java heap space` during the deployment, you can try closing any unessential programs or tabs (or just restart your machine) and re-try the `fastland beta` command. If the error appears again, add this property `org.gradle.jvmargs=-Xmx4608M` to your android/gradle.properties file and run again.
   
   - Near the end of the deployment process an AAB file is uploaded to the Google Play Store. This can take some time (e.g. 20 minutes on slow internet connections). It should be working, unless you get a `HTTPClient::SendTimeoutError: execution expired` error message in your terminal window. If the Fastlane process fails for this reason, you may need to run it again.

   ## TestFlight (iOS)

9. Make sure you have your email set in the  `APPLE_ID` variable in `app/.env`.

10. Go to the `/app/ios` directory in a terminal window and run the command `fastlane beta`.  You'll be prompted to login (maybe several times) with your App Store Connect login.
    > The process can take a while (sometimes 30 minutes or more)!  If it fails, try [the troubleshooting tips here](https://thecodingmachine.github.io/react-native-boilerplate/docs/BetaBuild/#troubleshooting), or ask for help on the team Slack channel if you can't figure it out.

11. If you have access, check in the [App Store Connect](https://appstoreconnect.apple.com/apps) that the new version of the app has successfully been uploaded and processed (STA Volunteer app > TestFlight) -- you should see the new build number below the latest version.

12. If you are part of the iOS beta test group, you should get a notification on your phone from TestFlight that a new version is available to test. Download the updated version of the app to your iPhone ([see download instructions](#download-the-app) near the top of this README).

