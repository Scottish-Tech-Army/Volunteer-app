const { mockClient } = require("aws-sdk-client-mock");
const express = require("express");
const request = require("supertest");
const {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AdminGetUserCommand,
  UserNotFoundException,
  SignUpCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

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
    test("returns tokens if challenge is correct for existing user", () => {});
    test("returns tokens if challenge is correct for new user user", () => {});
    test("returns error if challenge is incorrect", () => {});
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
