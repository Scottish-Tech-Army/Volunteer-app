import { getVideoWebpagePlayerOnly as _getVideoWebpagePlayerOnly } from '../services/vimeo';
import { getVideoWebpagePlayerOnly as __getVideoWebpagePlayerOnly } from '../services/youTube';

async function getVideoWebpagePlayerOnly(videoWebpageUrl) {
  if (!videoWebpageUrl) return;

  const vimeoUrl = await _getVideoWebpagePlayerOnly(videoWebpageUrl);
  if (vimeoUrl) return vimeoUrl;

  const youTubeUrl = __getVideoWebpagePlayerOnly(videoWebpageUrl);
  if (youTubeUrl) return youTubeUrl;

  return;
}

export default {
  getVideoWebpagePlayerOnly,
};
