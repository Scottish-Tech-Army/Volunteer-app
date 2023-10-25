const express = require("express");
const router = express.Router();
const {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AdminRespondToAuthChallengeCommand,
  RevokeTokenCommand,
  AdminGetUserCommand,
  SignUpCommand,
  AdminUpdateUserAttributesCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const { v4: uuidv4 } = require("uuid");
const jwtDecode = require("jwt-decode");

router.post("/login", async (req, res) => {
  const email = req.body?.email;

  if (!email) {
    return res.status(400).send({
      error: "invalid_input",
      message: "Email is required",
    });
  }

  const { cognitoClient, hubspot } = req.dependencies;

  try {
    await cognitoClient.send(
      new AdminGetUserCommand({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: email,
      })
    );
  } catch (e) {
    if (e.name === "UserNotFoundException") {
      const hasContact = await hubspot.hasContactByEmail(email);

      if (!hasContact) {
        return res.status(403).send({
          error: "signup_required",
          message: "Please signup via the STA website first",
        });
      }

      await cognitoClient.send(
        new SignUpCommand({
          ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
          Password: uuidv4(),
          Username: email,
          UserAttributes: [
            {
              Name: "email",
              Value: email,
            },
          ],
        })
      );
    } else {
      throw e;
    }
  }

  const result = await cognitoClient.send(
    new AdminInitiateAuthCommand({
      AuthFlow: "CUSTOM_AUTH",
      AuthParameters: {
        USERNAME: email,
      },
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
    })
  );

  res.status(200).send({
    challenge: {
      username: result.ChallengeParameters?.["USERNAME"],
      session: result.Session,
    },
  });
});

router.post("/verify-challenge", async (req, res) => {
  const username = req.body.username;
  const session = req.body.session;
  const answer = req.body.answer;
  const { cognitoClient } = req.dependencies;

  const result = await cognitoClient.send(
    new AdminRespondToAuthChallengeCommand({
      ChallengeName: "CUSTOM_CHALLENGE",
      ChallengeResponses: {
        USERNAME: username,
        ANSWER: answer,
      },
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Session: session,
    })
  );

  if (result.AuthenticationResult) {
    const claims = jwtDecode(result.AuthenticationResult.IdToken);

    if (!claims.email_verified) {
      await cognitoClient.send(
        new AdminUpdateUserAttributesCommand({
          UserAttributes: [
            {
              Name: "email_verified",
              Value: "true",
            },
          ],
          Username: username,
          UserPoolId: process.env.COGNITO_USER_POOL_ID,
        })
      );
    }

    return res.status(200).send({
      tokens: {
        accessToken: result.AuthenticationResult.AccessToken,
        idToken: result.AuthenticationResult.IdToken,
        refreshToken: result.AuthenticationResult.RefreshToken,
      },
    });
  }

  res.status(200).send({
    challenge: {
      username,
      session: result.Session,
    },
  });
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).send({
      error: "invalid_input",
      message: "Refresh token is required",
    });
  }

  const { cognitoClient } = req.dependencies;

  const result = await cognitoClient.send(
    new AdminInitiateAuthCommand({
      AuthFlow: "REFRESH_TOKEN_AUTH",
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
    })
  );

  if (result.AuthenticationResult) {
    return res.status(200).send({
      tokens: {
        accessToken: result.AuthenticationResult.AccessToken,
        idToken: result.AuthenticationResult.IdToken,
        refreshToken: result.AuthenticationResult.RefreshToken,
      },
    });
  }

  res.status(500).send("Unknown refresh token error");
});

router.post("/logout", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).send({
      error: "invalid_input",
      message: "Refresh token is required",
    });
  }

  const { cognitoClient } = req.dependencies;

  await cognitoClient.send(
    new RevokeTokenCommand({
      Token: refreshToken,
      ClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    })
  );

  res.status(200).send();
});

const cognitoClient = new CognitoIdentityProviderClient({});

module.exports = {
  authApi: router,
  middlewares: async (req, res, next) => {
    req.dependencies = {
      cognitoClient,
      // TODO: Add Hubspot client
      hubspot: {
        hasContactByEmail: async () => true,
      },
    };
    next();
  },
};
