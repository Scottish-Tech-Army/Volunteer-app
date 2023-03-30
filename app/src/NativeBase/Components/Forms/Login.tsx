import { Amplify, Auth } from 'aws-amplify'

Amplify.configure({
  Auth: {
    userPoolId: 'eu-west-2_MAs5C8bBk',

    // REQUIRED - Amazon Cognito Region
    region: 'eu-west-2',
  },

  // OPTIONAL - Hosted UI configuration
  oauth: {
    domain: 'your_cognito_domain',
    scope: [
      'phone',
      'email',
      'profile',
      'openid',
      'aws.cognito.signin.user.admin',
    ],
    redirectSignIn: 'http://localhost:3000/',
    redirectSignOut: 'http://localhost:3000/',
    responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
  },
})

// You can get the current config object
const currentConfig = Auth.configure()
