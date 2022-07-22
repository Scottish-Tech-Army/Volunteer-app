const axios = require('axios').default;


async function getVideoFileFromVimeo(video) {
  if (video) {
    let parsed = new URL(video);

    const vimeoId = parsed.pathname.split('/')[1];

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