/**
 * @file Show a video.
 */

import { navigate } from '@/Navigators/utils'
import { Box } from 'native-base'
import React, { FC, useState } from 'react'
import VideoComponent from 'react-native-video'
import WebView from 'react-native-webview'
import LinkAndArrow from './LinkAndArrow'

interface VideoProps {
  videoFile?: string
  videoWebpage?: string
  videoWebpagePlayerOnly?: string
}

/**
 * Component showing tappable list of options in a vertical list with horizontal arrows.
 *
 * @param {VideoProps} props The component props
 * @returns {React.ReactElement} Component
 */
const Video: FC<VideoProps> = ({
  videoFile,
  videoWebpage,
  videoWebpagePlayerOnly,
}) => {
  const aspectRatio = 9 / 16
  const [boxWidth, setBoxWidth] = useState(0)
  const height = boxWidth * aspectRatio
  const [useVideoFileIfAvailable, setUseVideoFileIfAvailable] = useState(true)
  const [
    useVideoWebpagePlayerIfAvailable,
    setUseVideoWebpagePlayerIfAvailable,
  ] = useState(true)
  const webViewStyle = {
    minHeight: height,
    width: boxWidth,
  }

  if (
    (!videoFile || !useVideoFileIfAvailable) &&
    (!videoWebpagePlayerOnly || !useVideoWebpagePlayerIfAvailable) &&
    !videoWebpage
  )
    return null

  return (
    <Box
      display="flex"
      onLayout={onLayoutEvent => {
        const { width } = onLayoutEvent.nativeEvent.layout
        setBoxWidth(width)
      }}
    >
      {/*
       * Ideally we use the MP4 video_file so we can play it using a native player
       * As a fallback we use video_webpage_player_only to show the video inside a small webview (it should look like just a normal video player, not a web page) on the screen they're already on
       * As a second fallback if there is a video_webpage we give the user a link to watch the video in a web view on another screen
       */}
      {videoFile && useVideoFileIfAvailable ? (
        <VideoComponent
          controls
          onError={error => {
            setUseVideoFileIfAvailable(false)
            console.error('Error loading video file', error)
          }}
          paused
          source={{ uri: videoFile }}
          style={{ width: boxWidth, height }}
        />
      ) : videoWebpagePlayerOnly && useVideoWebpagePlayerIfAvailable ? (
        <WebView
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          onError={error => {
            setUseVideoWebpagePlayerIfAvailable(false)
            console.error('Error loading video webpage - player only', error)
          }}
          source={{ uri: videoWebpagePlayerOnly as string }}
          style={webViewStyle}
        />
      ) : (
        <LinkAndArrow
          onPress={() =>
            navigate('ProjectVideo', {
              url: videoWebpage as string,
            })
          }
          text="Watch video"
        />
      )}
    </Box>
  )
}

export default Video
