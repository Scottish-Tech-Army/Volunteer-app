const logging = require('../services/logging');

// Returns the URL of a webpage which contains only a video player (no branding, text, other videos, etc)
function getVideoWebpagePlayerOnly(videoWebpageUrl) {
  const youTubeId = module.exports.getVideoIdFromUrl(videoWebpageUrl);
  if (!youTubeId) return;

  return `https://www.youtube.com/embed/${youTubeId}`;
}

// Gets the ID of a YouTube video from the URL of a YouTube video page
// E.g. pass in 'https://www.youtube.com/watch?v=EGYiyvcVPqc' or 'https://youtu.be/EGYiyvcVPqc' and you get back 'EGYiyvcVPqc'
function getVideoIdFromUrl(videoWebpageUrl) {
  try {
    const urlObject = new URL(videoWebpageUrl);

    if (videoWebpageUrl.includes('youtube.com')) {
      const params = new URLSearchParams(urlObject.search);

      return params.get('v') ?? undefined;
    } else if (videoWebpageUrl.includes('youtu.be')) {
      return urlObject.pathname.split('/')[1]; // get the part after the first forward slash in the pathname
    } else {
      return;
    }
  } catch (error) {
    logging.logError(`Could not get YouTube video ID from video webpage URL ${videoWebpageUrl}`, {
      extraInfo: error,
    });

    return;
  }
}

module.exports = {
  getVideoWebpagePlayerOnly,
  getVideoIdFromUrl,
};
