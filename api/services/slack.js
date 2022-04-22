require('dotenv').config();
const axios = require('axios').default;

function convertSlackChannelNameToWebHookEnvVariable (channel) {
  return `SLACK_WEBHOOK_${channel.toUpperCase().replace(/-/g, '_')}`;
}

async function postMessage(channel, text) {
  const webHookEnvVariableName = convertSlackChannelNameToWebHookEnvVariable(channel);

  if (!process.env[webHookEnvVariableName]) {
    const error = `❌ Webhook variable ${webHookEnvVariableName} for Slack channel ${channel} has not been set in your .env file`;
    console.error(error);

    return {
      error,
    };
  }

  const response = await axios.post(process.env[webHookEnvVariableName], {
    text,
  });

  return response.status === 200 ? {
    data: 'success',
  } : {
    error: response.statusText,
  }
}

module.exports = {
  postMessage,
};
