const { mockClient } = require("aws-sdk-client-mock");
require("aws-sdk-client-mock-jest");
const express = require("express");
const request = require("supertest");
const {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AdminGetUserCommand,
  UserNotFoundException,
  SignUpCommand,
  AdminRespondToAuthChallengeCommand,
  AdminUpdateUserAttributesCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const jwt = require("jsonwebtoken");

const { authApi } = require("../../routes/auth");

describe("/auth", () => {
  const mockCognitoClient = mockClient(CognitoIdentityProviderClient);
  const mockHubspot = {
    hasContactByEmail: jest.fn(),
  };
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(
      "/auth",
      (req, res, next) => {
        req.dependencies = {
          cognitoClient: mockCognitoClient,
          hubspot: mockHubspot,
        };
        next();
      },
      authApi
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    mockCognitoClient.reset();
  });

  describe("POST /login", () => {
    test("returns auth challenge if user exists", async () => {
      mockCognitoClient.on(AdminGetUserCommand).resolves({
        UserAttributes: [{ Name: "sub", Value: "1234" }],
      });

      mockCognitoClient
        .on(AdminInitiateAuthCommand, {
          AuthFlow: "CUSTOM_AUTH",
          AuthParameters: {
            USERNAME: "foo@bar.com",
          },
        })
        .resolves({
          ChallengeName: "CUSTOM_CHALLENGE",
          ChallengeParameters: {
            USERNAME: "foo@bar.com",
          },
          Session: "123abc",
        });

      const response = await request(app).post("/auth/login").send({
        email: "foo@bar.com",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        challenge: {
          username: "foo@bar.com",
          session: "123abc",
        },
      });
    });

    test("returns error if username not provided", async () => {
      const response = await request(app).post("/auth/login");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "invalid_input",
        message: "Email is required",
      });
    });

    test("returns auth challenge if user does not exist but is registered", async () => {
      mockCognitoClient.on(AdminGetUserCommand).rejects(
        new UserNotFoundException({
          $metadata: {},
          message: "User not found",
        })
      );

      mockHubspot.hasContactByEmail.mockResolvedValue(true);

      mockCognitoClient
        .on(SignUpCommand, {
          Username: "foo@bar.com",
        })
        .resolves({
          UserSub: "123",
        });

      mockCognitoClient
        .on(AdminInitiateAuthCommand, {
          AuthFlow: "CUSTOM_AUTH",
          AuthParameters: {
            USERNAME: "foo@bar.com",
          },
        })
        .resolves({
          ChallengeName: "CUSTOM_CHALLENGE",
          ChallengeParameters: {
            USERNAME: "foo@bar.com",
          },
          Session: "123abc",
        });

      const response = await request(app).post("/auth/login").send({
        email: "foo@bar.com",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        challenge: {
          username: "foo@bar.com",
          session: "123abc",
        },
      });
    });

    test("returns error if user does not exist and is not registered", async () => {
      mockCognitoClient.on(AdminGetUserCommand).rejects(
        new UserNotFoundException({
          $metadata: {},
          message: "User not found",
        })
      );

      mockHubspot.hasContactByEmail.mockResolvedValue(false);

      const response = await request(app).post("/auth/login").send({
        email: "foo@bar.com",
      });

      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        error: "signup_required",
        message: "Please signup via the STA website first",
      });
    });
  });

  describe("POST /verify-challenge", () => {
    test("returns tokens on correct challenge answer for existing user", async () => {
      const idToken = jwt.sign(
        {
          email_verified: true,
        },
        "secret"
      );

      mockCognitoClient
        .on(AdminRespondToAuthChallengeCommand, {
          ChallengeName: "CUSTOM_CHALLENGE",
          Session: "123abc",
          ChallengeResponses: {
            USERNAME: "foo@bar.com",
            ANSWER: "123456",
          },
        })
        .resolves({
          AuthenticationResult: {
            AccessToken: "access-token",
            IdToken: idToken,
            RefreshToken: "refresh-token",
          },
        });

      const response = await request(app).post("/auth/verify-challenge").send({
        username: "foo@bar.com",
        session: "123abc",
        answer: "123456",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        tokens: {
          accessToken: "access-token",
          idToken: idToken,
          refreshToken: "refresh-token",
        },
      });
    });

    test("returns tokens on correct challenge answer for new user user", async () => {
      const idToken = jwt.sign(
        {
          email_verified: false,
        },
        "secret"
      );

      mockCognitoClient
        .on(AdminRespondToAuthChallengeCommand, {
          ChallengeName: "CUSTOM_CHALLENGE",
          Session: "123abc",
          ChallengeResponses: {
            USERNAME: "foo@bar.com",
            ANSWER: "123456",
          },
        })
        .resolves({
          AuthenticationResult: {
            AccessToken: "access-token",
            IdToken: idToken,
            RefreshToken: "refresh-token",
          },
        });

      const response = await request(app).post("/auth/verify-challenge").send({
        username: "foo@bar.com",
        session: "123abc",
        answer: "123456",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        tokens: {
          accessToken: "access-token",
          idToken: idToken,
          refreshToken: "refresh-token",
        },
      });
      expect(mockCognitoClient).toHaveReceivedCommand(
        AdminUpdateUserAttributesCommand,
        {
          Username: "foo@bar.com",
          UserAttributes: [
            {
              Name: "email_verified",
              Value: "true",
            },
          ],
        }
      );
    });

    test("continues challenge on incorrect answer", async () => {
      mockCognitoClient
        .on(AdminRespondToAuthChallengeCommand, {
          ChallengeName: "CUSTOM_CHALLENGE",
          Session: "123abc",
          ChallengeResponses: {
            USERNAME: "foo@bar.com",
            ANSWER: "123456",
          },
        })
        .resolves({
          ChallengeName: "CUSTOM_CHALLENGE",
          ChallengeParameters: {
            USERNAME: "foo@bar.com",
          },
          Session: "123abc",
        });

      const response = await request(app).post("/auth/verify-challenge").send({
        username: "foo@bar.com",
        session: "123abc",
        answer: "123456",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        challenge: {
          username: "foo@bar.com",
          session: "123abc",
        },
      });
    });
  });

  describe("POST /refresh", () => {
    test("returns new tokens if refresh token is valid", () => {});
    test("returns error if refresh token is invalid", () => {});
  });

  describe("POST /logout", () => {
    test("returns success if refresh token is valid", () => {});
    test("returns error if refresh token is invalid", () => {});
  });
});
