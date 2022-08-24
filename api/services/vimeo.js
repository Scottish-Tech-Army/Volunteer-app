/**
 * Vimeo API request to retrieve MP4 version for the requested video webpage 
 */

const axios = require('axios').default;


async function getVideoFileFromVimeo(video_webpage) {
  if (video_webpage) {
    const videoUrlObject = new URL(video_webpage);

    const vimeoId = videoUrlObject.pathname.split('/')[1];

    // condition verifies if the vimeoId is the correct format and contains only digits
    if (vimeoId.match(/^[0-9]+$/)) {
      const vimeoData = await axios.get(
        `https://player.vimeo.com/video/${vimeoId}/config`,
        {
          Accept: 'application/json',
        });

      const videoFile = vimeoData.data.request.files.progressive[0].url;
      return videoFile;
    }
  }
}

module.exports = {
  getVideoFileFromVimeo,
};