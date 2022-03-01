- [Welcome](#welcome)
- [Requirements to run the project:](#requirements-to-run-the-project)
  - [](#)
- [Setup](#setup)
- [For Additional Information:](#for-additional-information)

# Welcome

Welcome to the the Volunteering App Github repo

# Requirements to run the project:
##        
1. Node.js LTS release         
2. npm     
   >npm usually is installed when Node.js is installed. type npm --version to check if it is installed after installing Node.js in Command Terminal 
3. Ensure that you have read through for your particular platform: https://reactnative.dev/docs/environment-setup
4. Make sure that you have Android 10 installed and not higher.

# Setup  

1. Ensure that you've gone through the following link for your particular platform: https://reactnative.dev/docs/environment-setup

2. Pull the code from Git
 
3. Open Command terminal

4. Go to the `api` folder inside the project folder (e.g. **\Volunteer-app path\api**)

5. Create .env file to store Jira API access credentials.
    >**Note** Credentials themselves not provided, these should be requested/provided on joining the dev group.

6. At the command prompt type `npm install` then `npm start` to start the Volunteer App API server.

7. Go to the `app` folder inside the project folder (e.g. **\Volunteer-app path\app**)      
 
8. At the command prompt type `npm install`     
    >**Note:** Inside the `app` folder there is package-lock.json. Everytime this is modified, it is advised to repeat step 6 before  running the project.
          
    >**Note:** you may need to run `npm install --legacy-peer-deps`

9. duplicate the example config file `app/src/Config/index.example.ts` and name your new file `app/src/Config/index.ts`

10. Replace the IP address with your own in `STA_BASE_URL: 'http://192.168.1.241:3000'` (localhost may not work if you are using Android, as it interprets it as its own IP address).

11. type in command terminal: `npm run ios` or `npm run android`