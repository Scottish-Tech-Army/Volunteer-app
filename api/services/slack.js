/*
 * POST MESSAGES TO SLACK
 *
 * See instructions in the README on how to enable new Slack channels
 */

require('dotenv').config();
const axios = require('axios').default;

function convertChannelNameToWebHookEnvVariable (channel) {
  return `SLACK_SECRET_WEBHOOK_${channel.toUpperCase().replace(/-/g, '_')}`;
}

async function postMessage(channel, text) {
  const webHookEnvVariableName = convertChannelNameToWebHookEnvVariable(channel);

  if (!process.env[webHookEnvVariableName]) {
    const error = `❌ Webhook variable ${webHookEnvVariableName} for Slack channel ${channel} has not been set in your .env file`;
    console.error(error);

    return {
      error,
    };
  }

  try {
    const response = await axios.post(process.env[webHookEnvVariableName], {
      text,
    });

    if (response.status === 200) {
      return {
        data: 'success',
      };
    } else {
      console.error(response.statusText);

      return {
        error: response.statusText,
      }
    }
  } catch (error) {
    console.error(error.message);

    return {
      error: error.message,
    };
  }
}

module.exports = {
  convertChannelNameToWebHookEnvVariable,
  postMessage,
};
