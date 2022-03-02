- [Welcome](#welcome)
- [Requirements to run the project:](#requirements-to-run-the-project)
- [Setup](#setup)
- [Run](#run)

# Welcome

Welcome to the the Volunteering App Github repo

# Requirements to run the project:
    
1. Node.js LTS release         
2. npm     
   >npm usually is installed when Node.js is installed. type npm --version to check if it is installed after installing Node.js in Command Terminal 
3. Ensure that you have read through for your particular platform: https://reactnative.dev/docs/environment-setup
4. Make sure that you have Android 10 installed and not higher.


# Setup     

1. Ensure that you've gone through the following link for your particular platform: https://reactnative.dev/docs/environment-setup
2. Pull the code from Git
3. Open command terminal
4. Go to the `app` folder inside the project folder (e.g. **\Volunteer-app path\app**)
5. Type in command terminal: `npm install`     
    >**Note:** Inside the `app` folder there is package-lock.json. Every time this is modified, it is advised to repeat `npm install` before running the project.      
    >**Note:** you may need to run `npm install --legacy-peer-deps`
6. Duplicate the example config file `app/src/Config/index.example.ts` and name your new file `app/src/Config/index.ts`
7. Go to the `api` folder inside the project folder (e.g. **\Volunteer-app path\api**)
8. Type in command terminal: `npm install`     
    >**Note:** Inside the `api` folder there is package-lock.json. Every time this is modified, it is advised to repeat `npm install` before running the project.
9. Copy the `.env.example` file in the api root folder and name your new file `.env` in the same folder.  Fill in the empty values (`""`) in your file for any credentials/settings (API keys for STA Jira API access etc) - ask another team member who can tell you what these should be.

# Run

10. Open command terminal
11. Go to the `api` folder inside the project and enter command: `npm start`
12. Leave that running and open another command terminal window
13. Go to the `app` folder inside the project and enter command: `npm run ios` or `npm run android`
14. Optional: Update the cached projects/resources data from Jira that's stored in a shared AirTable database (you probably only need to use this while developing if you need the very latest data from Jira or you're actively testing the caching mechanism).  Open another command terminal window, go to the `api` folder inside the project.
    - If you want to update the cached data once only, enter this command: `node cache/projects.js`
    - If you want to update the cached data regularly using a cron job, enter this command instead: `node cache/cron-jobs.js`  Leave this terminal window open as long as you want this to keep running.
