const vimeoService = require('../services/vimeo')
const youTubeService = require('../services/youTube')

async function getVideoWebpagePlayerOnly(videoWebpageUrl) {
  if (!videoWebpageUrl) return

  const vimeoUrl = await vimeoService.getVideoWebpagePlayerOnly(videoWebpageUrl)
  if (vimeoUrl) return vimeoUrl

  const youTubeUrl = youTubeService.getVideoWebpagePlayerOnly(videoWebpageUrl)
  if (youTubeUrl) return youTubeUrl

  return
}

module.exports = {
  getVideoWebpagePlayerOnly,
}
