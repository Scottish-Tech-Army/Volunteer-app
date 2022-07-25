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

[To add]

# API deployment on AWS

June 2022:

In the volapp-dev-test account, an [Elastic Beanstalk](https://eu-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-2#/environments) environment called Volunteerapp-env has been created (manually for now).

You can connect your app to this environment by changing STA_BASE_URL to the load balancer address in `Volunteer-app/app/src/Config/index.ts`:

` STA_BASE_URL: 'http://volunteerapp-env.eba-ivfm2tgp.eu-west-2.elasticbeanstalk.com',`

Note - as we move this into IaC and set up some build pipelines, things like env names, app names, domain names, IP Addresses will probably change.

For support, please @ David Calder in the [volunteer-app](https://scottishtecharmy.slack.com/archives/C01SUL6K5E1) Slack channel

## Updating the API

1. Git clone Scottish-Tech-Army/Volunteer-app to your computer
2. `cd Volunteer-app/api`
3. `zip ../myapp.zip -r * .[^.]*`
4. Go to the AWS Management Console and navigate to Elastic Beanstalk.
5. In [Application versions](https://eu-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-2#/application/versions?applicationName=volunteer-app), Upload the myapp.zip that you created in step 3.
6. Now select the version label you've just created and then select Action > Deploy
7. Go to the environment dashboard and check the version label has updated and the Health is OK. If not, check the Logs (menu on the left hand side).

## Known issues

- The iOS simulator only works with the IP Address of the Load Balancer as the value of STA_BASE_URL:
  - ` STA_BASE_URL: 'http://18.134.220.155',`

# App deployment

**If you're on a Mac** you can deploy the Android and iOS versions of the app.

**If you're on Windows/Linux** you can only deploy the Android version of the app (you'll always need to get another team member with a Mac to deploy the iOS version).

1. In the pull request for the changes you're making (e.g. a new app feature), before you submit the PR for review, update the `version` number in `app/package.json`. Normally for minor features/fixes, just update the last part of the version number (e.g. `"1.0.24"` becomes `"1.0.25"`).

2. Update `/app/android/app/build.gradle` at the same time _(be careful here! there are other files called `build.gradle` in other similar directories)_. About halfway down the file there are two things you need to update:

   a. `versionCode` - this must be 1 higher than the existing number, e.g. `48` becomes `49` (don't use any dots in this one), no quote marks

   b. `versionName` - make this the same as `version` in `/app/package.json`, this should be in quotes (e.g. `"1.0.24"` becomes `"1.0.25"`)

3. Add changelog notes - a quick summary (a line or two will usually do) of what this new version does. This should be a .txt file in `/app/android/fastlane/metadata/android/en-GB/changelogs` named `X.txt` where `X` is the same number you used for `versionCode` in the previous step, e.g. `/app/android/fastlane/metadata/android/en-GB/changelogs/49.txt`

4. Get your pull request approved as you normally would. When you're ready to merge your code into the `main` branch and deploy the updated app, double-check your version numbers in the previous steps are still right compared to what's in `main` (somebody else could have merged in code recently and changed the version numbers since you last checked - if you need to, update the version numbers before merging).

5. In `/app/src/Config/index.ts` set `STA_BASE_URL` to point to the external URL for [the API endpoint on AWS](#api-deployment-on-aws) -- not to your localhost or its IP address, otherwise the app won't be able to connect to the API when it's installed on someone's phone.

   ## Google Play Store (Android)

6. Go to the `/app/android` directory in a terminal window and run the command `fastlane beta`. You'll be prompted twice at the beginning for passwords -- both are the password you got for the `my-release-key.keystore` file in the [Setup to deploy the app section](#setup-to-deploy-the-app) above.

   > The process can take a while (sometimes 30 minutes or more)! If it fails, try [the troubleshooting tips here](https://thecodingmachine.github.io/react-native-boilerplate/docs/BetaBuild/#troubleshooting), see [Google Play Store known issues](#google-play-store-known-issues) below or ask for help on the team Slack channel if you can't figure it out.

7. If you have access, check in the [Google Play Console](https://play.google.com/console) that the new version of the app has successfully been added (Volunteer app > Release > Internal testing) -- you should see the new version number next to 'Latest release' under 'Track summary'.

8. Download the updated version of the app to your Android phone ([see download instructions](#download-the-app) near the top of this README). On the Google Play Store screen, there should be an 'Update' button to download the latest version of the app to your device.

   ### Google Play Store known issues

   - Near the end of the deployment process an AAB file is uploaded to the Google Play Store. This can take some time (e.g. 20 minutes on slow internet connections). It should be working, unless you get a `HTTPClient::SendTimeoutError: execution expired` error message in your terminal window. If the Fastlane process fails for this reason, you may need to run it again.

   ## TestFlight (iOS)

[More instructions to be added]
