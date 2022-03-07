- [Welcome](#welcome)
- [Requirements to run the project:](#requirements-to-run-the-project)
- [Setup](#setup)
- [For Additional Information:](#for-additional-information)

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

9. Duplicate the example config file `app/src/Config/index.example.ts` and name your new file `app/src/Config/index.ts`
    >**Note** If the app has difficulty connecting to the API, you may need specify your IP address in `index.ts`. Replace `localhost` in the line `STA_BASE_URL: 'http://localhost:3000'` with your own.

10. type in command terminal: `npm run ios` or `npm run android`

# Subsequent run

1. Open Command terminal.

2. Go to the `api` folder inside the project folder (e.g. **\Volunteer-app path\api**) and enter `npm start` to start the Volunteer App API server.

3. Go to the `app` folder inside the project folder (e.g. **\Volunteer-app path\app**) and enter `npm run ios` or `npm run android`.

4. Optional: Update the cached projects/resources data from Jira *(during development, you probably only need to use this if you need the very latest data from Jira or you're actively testing the caching mechanism)*.  Open another command terminal window, go to the `api` folder inside the project.
    - If you want to manually update the cached data, enter this command: `node cache/run-projects.js`
        >During development, it's preferable to do this than to run the scheduled cron job described below.
    - If you want to automatically update the cached data regularly using a [cron job](https://en.wikipedia.org/wiki/Cron), enter this command instead: `node cache/run-cron-jobs.js`  Leave this terminal window open as long as you want this to keep running.
        >Be careful if using this during development: if multiple developers are running this simultaneously, these could conflict if more than one person is updating the same AirTable tables at the same time.
