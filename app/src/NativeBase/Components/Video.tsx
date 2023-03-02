// Show a video

import { Box } from 'native-base'
import React, { FC, useState } from 'react'
import { Platform } from 'react-native'
import VideoComponent from 'react-native-video'
import WebView from 'react-native-webview'

interface VideoProps {
  video_file?: string
  video_webpage?: string
}

const Video: FC<VideoProps> = ({ video_file, video_webpage }) => {
  const aspectRatio = 9 / 16
  const [boxWidth, setBoxWidth] = useState(0)
  const height = boxWidth * aspectRatio
  let playerWebPageUrl = '' as string | undefined
  const webViewStyle = {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    minHeight: height,
    width: boxWidth,
  }

  // TODO: improve logic here

  if (!video_file && !video_webpage) return null

  if (video_webpage && isVimeoUrl(video_webpage)) {
    const vimeoId = getVimeoIdFromUrl(video_webpage)

    if (vimeoId) playerWebPageUrl = `https://player.vimeo.com/video/${vimeoId}`
  } else if (video_webpage && isYouTubeUrl(video_webpage)) {
    const youTubeId = getYouTubeIdFromUrl(video_webpage)

    if (youTubeId)
      playerWebPageUrl = `https://www.youtube.com/embed/${youTubeId}`
  }

  if (!video_file && !playerWebPageUrl) return null

  return (
    <Box
      display="flex"
      onLayout={onLayoutEvent => {
        const { width } = onLayoutEvent.nativeEvent.layout
        setBoxWidth(width)
      }}
    >
      {video_file ? (
        <VideoComponent
          source={{ uri: video_file }}
          paused
          style={{ width: boxWidth, height }}
          controls
        />
      ) : (
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: playerWebPageUrl as string }}
          // source={{ uri: 'https://player.vimeo.com/video/796935881' }}
          // source={{ uri: 'https://www.youtube.com/embed/EGYiyvcVPqc' }}
          style={webViewStyle}
        />
      )}
    </Box>
  )
}

const isYouTubeUrl = (videoWebPageUrl: string) =>
  videoWebPageUrl.includes('youtube.com') ||
  videoWebPageUrl.includes('youtu.be')

const isVimeoUrl = (videoWebPageUrl: string) =>
  videoWebPageUrl.includes('vimeo.com')

const getYouTubeIdFromUrl = (videoWebPageUrl: string) => {
  const urlObject = new URL(videoWebPageUrl)

  const pathnameArray = urlObject.pathname.split('/')

  return pathnameArray[pathnameArray.length - 1]
}

const getVimeoIdFromUrl = (videoWebPageUrl: string) => {
  const urlObject = new URL(videoWebPageUrl)

  // We ideally want a URL like https://vimeo.com/796237419 but some people are entering URLs like https://vimeo.com/manage/videos/796237419 so we need to force the format we want
  const pathnameCleaned = urlObject.pathname.replace('manage/videos/', '')

  const vimeoId = pathnameCleaned.split('/')[1] // get the part after the first forward slash in the pathname

  // Verify if the vimeoId contains only digits
  if (vimeoId.match(/^[0-9]+$/)) {
    return vimeoId
  }
}

export default Video
