/**
 * Vimeo API request to retrieve MP4 video files and thumbnail images for the requested video webpage
 */

import axios from 'axios'
import { Vimeo } from 'vimeo'
import logging from '../services/logging'

function client() {
  return new Vimeo(
    process.env.VIMEO_CLIENT_ID,
    process.env.VIMEO_CLIENT_SECRET,
    process.env.VIMEO_ACCESS_TOKEN,
  )
}

// Returns the URL of a thumbnail image for the video
async function getVideoThumbnail(videoWebpageUrl) {
  if (!videoWebpageUrl) return

  const vimeoId = _getVideoIdFromUrl(videoWebpageUrl)
  if (!vimeoId) return

  try {
    const vimeoResponse = await axios.get(
      `https://player.vimeo.com/video/${vimeoId}/config`,
    )

    if (vimeoResponse.status === 200) {
      if (vimeoResponse.data?.video?.thumbs) {
        // Vimeo API returns a variety of different size thumbnails -- numbers refer to pixel widths of images
        // We use a large one if it exists
        const thumbnailUrl =
          vimeoResponse.data.video.thumbs['1280'] ??
          vimeoResponse.data.video.thumbs['960'] ??
          vimeoResponse.data.video.thumbs.base

        // Add a file extension in order to make sure the image shows in the front-end app -- on some emulators had problems where the image did not include an extension
        return `${thumbnailUrl}.jpg`
      } else {
        logging.logError(
          `❌ Could not get Vimeo thumbnail for video ID ${vimeoId} -- no thumbnail returned from Vimeo`,
        )
      }
    } else {
      logging.logError(
        `❌ Could not get Vimeo thumbnail for video ID ${vimeoId} -- error connecting to Vimeo API`,
        {
          extraInfo: vimeoResponse.statusText,
        },
      )
    }
  } catch (error) {
    logging.logError(
      `❌ Could not get Vimeo thumbnail for video ID ${vimeoId} -- error connecting to Vimeo API`,
      {
        extraInfo: error,
      },
    )
  }

  return
}

// Returns the URL of a webpage which contains only a video player (no branding, text, other videos, etc)
async function getVideoWebpagePlayerOnly(videoWebpageUrl) {
  if (!videoWebpageUrl) return

  const vimeoId = _getVideoIdFromUrl(videoWebpageUrl)
  if (!vimeoId) return

  const vimeoClient = _client()

  return new Promise((resolve, reject) => {
    try {
      vimeoClient.request(
        {
          method: 'GET',
          path: `/videos/${vimeoId}`,
        },
        function (error, body) {
          if (error) {
            logging.logError('Error getting video info from Vimeo', {
              extraInfo: error,
            })

            resolve(getVideoWebpagePlayerOnlyDefault(vimeoId))
          } else if (body.player_embed_url) {
            // This is the ideal player-only URL to use -- returned by the Vimeo API from our Vimeo account
            resolve(body.player_embed_url)
          }

          resolve(getVideoWebpagePlayerOnlyDefault(vimeoId))
        },
      )
    } catch (error) {
      logging.logError('Error getting video info from Vimeo', {
        extraInfo: error,
      })

      resolve(getVideoWebpagePlayerOnlyDefault(vimeoId))
    }
  })
}

// Sometimes we can't get the player-only URL from the API, e.g. if it's a Vimeo video not uploaded to the STA account
// In those cases use this default player-only URL which should work
function getVideoWebpagePlayerOnlyDefault(vimeoId) {
  return `https://player.vimeo.com/video/${vimeoId}`
}

// Gets the ID of a Vimeo video from the URL of a Vimeo video page
// E.g. pass in 'https://vimeo.com/583815096' or 'https://vimeo.com/manage/videos/583815096' and you get back '583815096'
function getVideoIdFromUrl(videoWebpageUrl) {
  try {
    if (!videoWebpageUrl.includes('vimeo.com')) return

    const urlObject = new URL(videoWebpageUrl)

    // We ideally want a URL like https://vimeo.com/796237419 but URLs like https://vimeo.com/manage/videos/796237419 may also be used
    const pathnameCleaned = urlObject.pathname.replace('manage/videos/', '')

    const vimeoId = pathnameCleaned.split('/')[1] // get the part after the first forward slash in the pathname

    // Verify if the vimeoId contains only digits
    if (vimeoId.match(/^[0-9]+$/)) {
      return vimeoId
    } else {
      return
    }
  } catch (error) {
    logging.logError(
      `Error getting Vimeo video ID from video webpage URL ${videoWebpageUrl}`,
      {
        extraInfo: error,
      },
    )

    return
  }
}

export default {
  client,
  getVideoThumbnail,
  getVideoWebpagePlayerOnly,
  getVideoIdFromUrl,
}
