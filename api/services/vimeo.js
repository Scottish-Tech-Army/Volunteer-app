/**
 * Vimeo API request to retrieve MP4 video files and thumbnail images for the requested video webpage
 */

const axios = require('axios').default;

// Returns the URL of an MP4 video file
// This URL is only valid for an hour
async function getVideoFile(videoWebpageUrl) {
  if (!videoWebpageUrl) return;

  const vimeoId = module.exports.getVideoIdFromUrl(videoWebpageUrl);
  if (!vimeoId) return;

  try {
    const vimeoResponse = await axios.get(`https://player.vimeo.com/video/${vimeoId}/config`);

    if (vimeoResponse.status === 200) {
      const videoFile = vimeoResponse.data.request.files.progressive[0]?.url;

      return videoFile;
    } else {
      console.error(
        `❌ Could not get Vimeo video file for video ID ${vimeoId} -- error connecting to Vimeo API`,
        vimeoResponse.statusText,
      );
    }
  } catch (error) {
    console.error(
      `⚠️ Could not get Vimeo video file for video ID ${vimeoId} -- error connecting to Vimeo API, maybe because video creator restricted video embedding`,
      `${error.toString().substring(0, 50)}...`,
    );
  }
}

// Returns the URL of a thumbnail image for the video
async function getVideoThumbnail(videoWebpageUrl) {
  if (!videoWebpageUrl) return;

  const vimeoId = module.exports.getVideoIdFromUrl(videoWebpageUrl);
  if (!vimeoId) return;

  try {
    const vimeoResponse = await axios.get(`https://player.vimeo.com/video/${vimeoId}/config`);

    if (vimeoResponse.status === 200) {
      if (vimeoResponse.data?.video?.thumbs) {
        // Vimeo API returns a variety of different size thumbnails -- numbers refer to pixel widths of images
        // We use a large one if it exists
        const thumbnailUrl =
          vimeoResponse.data.video.thumbs['1280'] ??
          vimeoResponse.data.video.thumbs['960'] ??
          vimeoResponse.data.video.thumbs.base;

        // Add a file extension in order to make sure the image shows in the front-end app -- on some emulators had problems where the image did not include an extension
        return `${thumbnailUrl}.jpg`;
      } else {
        console.error(`❌ Could not get Vimeo thumbnail for video ID ${vimeoId} -- no thumbnail returned from Vimeo`);
      }
    } else {
      console.error(
        `❌ Could not get Vimeo thumbnail for video ID ${vimeoId} -- error connecting to Vimeo API`,
        vimeoResponse.statusText,
      );
    }
  } catch (error) {
    console.error(
      `⚠️ Could not get Vimeo thumbnail for video ID ${vimeoId} -- error connecting to Vimeo API, maybe because video creator restricted video embedding`,
      `${error.toString().substring(0, 50)}...`,
    );
  }

  return;
}

// Returns the URL of a webpage which contains only a video player (no branding, text, other videos, etc)
function getVideoWebpagePlayerOnly(videoWebpageUrl) {
  const vimeoId = module.exports.getVideoIdFromUrl(videoWebpageUrl);
  if (!vimeoId) return;

  return `https://player.vimeo.com/video/${vimeoId}`;
}

// Gets the ID of a Vimeo video from the URL of a Vimeo video page
// E.g. pass in 'https://vimeo.com/583815096' or 'https://vimeo.com/manage/videos/583815096' and you get back '583815096'
function getVideoIdFromUrl(videoWebpageUrl) {
  try {
    if (!videoWebpageUrl.includes('vimeo.com')) return;

    const urlObject = new URL(videoWebpageUrl);

    // We ideally want a URL like https://vimeo.com/796237419 but URLs like https://vimeo.com/manage/videos/796237419 may also be used
    const pathnameCleaned = urlObject.pathname.replace('manage/videos/', '');

    const vimeoId = pathnameCleaned.split('/')[1]; // get the part after the first forward slash in the pathname

    // Verify if the vimeoId contains only digits
    if (vimeoId.match(/^[0-9]+$/)) {
      return vimeoId;
    } else {
      return;
    }
  } catch (error) {
    console.error(error);

    return;
  }
}

module.exports = {
  getVideoFile,
  getVideoThumbnail,
  getVideoWebpagePlayerOnly,
  getVideoIdFromUrl,
};
