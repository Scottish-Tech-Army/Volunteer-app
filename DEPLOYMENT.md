This file gives instructions for deploying the API to AWS, and the app to TestFlight (iOS) and the Google Play Store (Android).

- [Setup to deploy the app](#setup-to-deploy-the-app)
- [App deployment](#app-deployment)

# Setup to deploy the app

These are the one-time setup steps you need to do in order to get ready to deploy the app.

## Google Play Store (Android)

1. Ask Joanna to give you **Developer access to the STA Google Play Store account**. That will allow you to check whether releases you deploy have uploaded successfully, and you'll be able to add new testers.

## TestFlight / App Store (iOS)

2. Ask Joanna to give you **Developer access to the STA App Store Connect account** (you should be able to do this without having to pay for an Apple Developer account). You will need an Apple account ([create one here free if you don't have one](https://support.apple.com/en-gb/HT204316)) -- then you'll need to give Joanna the email address you use for your Apple ID. Getting access to App Store Connect is necessary in order to submit iOS versions of the app via Expo Application Services, and will allow you to check whether releases you submit have been uploaded successfully and accepted by Apple.

# App deployment

**All devs on the team can deploy the app** -- it should be something we all usually incorporate into any pull request where we make a change to the front-end app.

**There are two versions of the app we can deploy** -- one for internal testing (TestFlight for iOS, Google Play Store _internal track_ for Android) and one for public release (App Store for iOS, Google Play Store _production track_ for Android). The internal testing versions are for the Volunteer app team to download and test before we release the app to the public. The public release versions are for anyone to download from the app stores.

**We use [Expo Application Services (EAS)](https://expo.dev/eas)** to build and deploy the app. We are using the free tier which gives us 30 builds per calendar month (15 iOS, 15 Android -- so it's really 15 new deployments). This includes test builds (the Google Play test version and TestFlight) and production builds, it's all the same total.

## Changing the EAS configuration

This isn't something you should need to do often, but if you want to amend the EAS configuration there are a couple of places to look:

Some build and submit settings are in `eas.json`.

There are also settings in the main Expo config file `app.config.ts` -- look for the `eas` object, also the `android` and `ios` objects.

> Where you see `process.env.XXXXXXXXXX` references in `app.config.ts`, for the app build with Expo Application Services environment variables that are secret can be set [in our EAS account](https://expo.dev/accounts/scottishtecharmy/projects/volunteer-app/secrets) In cases where values are not secret and are not liable to change in the built app (e.g. the API `baseUrl` and `version`) these are set directly in the `app.config.ts` file (those `process.env.XXXXXXXXXX` variables are only used when you're running the app locally, getting values from your `.env` file).

> For builds, in EAS's terminology we use a 'production' profile for both testing and production versions of the app. (There are [other build options in EAS](https://docs.expo.dev/build/eas-json/) such as for 'internal' use, but those are not as well suited to uploading test versions that can be installed on any device.)

## Deployment process

**As a general rule you're strongly encouraged to deploy changes as part of any pull request that updates the front-end app** by following the steps below. **But we also just need to be careful not to hit the 15 deployments (30 builds)) limit,** so if there has been a high frequency of approved pull requests this month or your pull request is only a very minor change to the front-end app, you might not want to update the app version and do a new deployment. If you're not sure, check [how many builds have already been done this month](https://expo.dev/accounts/scottishtecharmy/settings/billing) (and if you're still unsure ask the team on Slack).

### Screenshots

3. If you're making major design/functionality changes/additions, consider updating the screenshots we use in the Google Play Store and App Store. Store screenshots in the `screenshots/app` directory. You'll need to upload them manually in the Google Play Store console, and you'll need to ask Joanna to do the same in App Store Connect.

### Pull request

4. In the pull request for the changes you're making (e.g. a new app feature), before you submit the PR for review, update the `version` number in `package.json`. Normally for minor features/fixes, just update the last part of the version number (e.g. `"1.0.24"` becomes `"1.0.25"` -- [read more about semantic versioning](https://semver.org/)).

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

   > If you get an error saying `Error reading Expo config ... Cannot find module 'dotenv/config'` you may need to reinstall the `dotenv` package. In the `app` directory run `npx expo install dotenv` (if that doesn't fix it try `npm install dotenv`) (If you get warnings, but not errors, when reinstalling this package - don't worry.)

   > Builds can take some time (sometimes 10-20 minutes, sometimes more than an hour, depending on how busy EAS servers are), but you can check the exact status of a build and the different steps that are taking place in the Expo Application Services dashboard -- follow the URL you'll see in your terminal after you run one of the build commands below (ask another team member for the Expo Application Services login details). You can also see there if there are any errors.

9. Once the build is complete, ignore the QR code and if you get a message asking _Install and run the Android build on an emulator?_ say **no**

### Submit to the Google Play Store

You've created an Android build and it's stored in the cloud with EAS. Now we need to submit it to the Google Play Store.

10. Make sure you use the right submit command. If you want to **publish the app to the internal test track** (for the Volunteer app team only to download) use `npm run submit-android-testing` -- or to **publish the app to production** (for people to download publicly from the Google Play Store) use `npm run submit-android-production`

11. When asked _What would you like to submit?_ choose _Select a build from EAS_. Then use arrow keys to choose the build from the list that you created with the build steps above, and press enter.

12. Wait for the build to be submitted.

13. Once it's finished, check in the [Google Play Console](https://play.google.com/console) that the new version of the app has successfully been added (_Volunteer app > Release > Internal testing_ or _Volunteer app > Release > Production_) -- you should see the new version number next to 'Latest release' under 'Track summary'.

> Google Play Store reviews the release before it's made public -- check the status of the release in the Google Play Console. If it's not yet available to download, check back later.

14. If you have an Android phone, download the updated version of the app ([see instructions](README.md#updating-to-the-latest-version-of-the-app)) and double check it's all working as expected.

### Build the iOS version

15. Make sure you are on the right branch locally and have pulled the latest code before you go any further.

> If you are deploying a production release, you should be on the `main` branch. If you are deploying a test release, you should be on a release branch.

> Do `git pull` to make sure you have pulled the latest changes from GitHub, including the pull request you merged in.

16. In the `app` directory run `npm run build-ios` (it's the same command if you are creating a build either for TestFlight internal testing or for production - releasing the app to the public)

> The next few steps below cover iOS-specific issues. See also the notes under step 7. above (Android build) about logging into Expo Application Services (EAS), installing extra packages, and some other issues you might also run into during the iOS build process.

17. If asked _Do you want to log in to your Apple account?_ say **yes.** Follow the steps to log into your account and when asked to select a Team and a Provider choose Scottish Tech Army.

> If you get an error message similar to `Failed to register bundle identifier` or `Apple 403 detected - Access forbidden` try logging in to your [App Store Account](https://appstoreconnect.apple.com/) (or [App Developer account](https://developer.apple.com/) if you have one) -- look around in your account, there may be some updated terms and conditions you need to accept before you can try running the build command again. If you can't see anything you need to accept, it may be that Alistair needs to accept some new terms & conditions in his [Apple developer account](https://developer.apple.com/account/) -- ask him (or ask Joanna to ask him) to check.

18. If asked if you want to generate a new Distribution Certificate and/or Provisioning Profile (if you've deployed recently you may not get asked this), say **yes**

19. If asked _Would you like to set up Push Notifications for your project?_ say **no**

20. Wait for the build process to complete

### Submit to TestFlight / the App Store

You've created an iOS build and it's stored in the cloud with EAS. Now we need to submit it to TestFlight / the App Store.

21. Make sure you use the right submit command. If you want to **publish the app to TestFlight for internal testing** (for the Volunteer app team only to download) use `npm run submit-ios-testing` -- or to **publish the app to production** (for people to download publicly from the App Store) use `npm run submit-ios-production`

22. When asked _What would you like to submit?_ choose _Select a build from EAS_. Then use arrow keys to choose the build from the list that you created with the build steps above, and press enter.

23. Wait for the build to be submitted.

24. Check in [App Store Connect](https://appstoreconnect.apple.com/apps) that the new version of the app has successfully been uploaded and processed (Apps > STA Volunteer App > TestFlight or Apps > STA Volunteer App > App Store) -- you should see the new build number below the latest version.

> Apple perform some automated checks on a build after it's been submitted, these can take 10-20 minutes. If you don't see your build appear in the list Apple might have found some problems with it. Check your email to see if you have a message from Apple, if not ask Joanna if she has.

> Check that the new build (matching the build number in App Store Connect to the version number you set in `package.json` e.g. `1.0.25`) has been published. When we submitted the first version of the app Joanna had to submit it to the App Store manually for review -- this may need to happen again for new production releases.

25. If you submitted a test version of the app (for TestFlight), you have an iPhone and you're part of the iOS beta test group, you should get a notification on your phone from TestFlight that a new version is available to test. Download the updated version of the app to your iPhone ([see instructions](README.md#updating-to-the-latest-version-of-the-app)).
