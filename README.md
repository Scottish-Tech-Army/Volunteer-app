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
9. Create a `.env` file in the api root folder and add the credentials for STA Jira API access

# Run

10. Open command terminal
11. Go to the `api` folder inside the project and enter command: `npm start`
12. Leave that running and open another command terminal window
13. Go to the `app` folder inside the project and enter command: `npm run ios` or `npm run android`