/**
 * @file Show a video.
 */

import { navigate, RootStackParamList } from '@/Navigators/utils'
import { Box } from 'native-base'
import React, { FC, useState } from 'react'
import VideoComponent from 'react-native-video'
import WebView from 'react-native-webview'
import TextAndArrow from './TextAndArrow'

interface VideoProps {
  videoFile?: string
  videoWebpage?: string
  videoWebpagePlayerOnly?: string
  videoWebpageScreen?: keyof RootStackParamList // should be set if videoWebpage is set
}

/**
 * Component showing tappable list of options in a vertical list with horizontal arrows.
 *
 * @param {VideoProps} props The component props
 * @param {string} [props.videoFile] URL of an MP4 video file
 * @param {string} [props.videoWebpage] URL of a webpage containing a video player plus probably other branding, text, other videos, etc
 * @param {string} [props.videoWebpagePlayerOnly] URL of a webpage containing simply a video player only (no branding, text, other videos, etc)
 * @param {keyof RootStackParamList} [props.videoWebpageScreen] The screen to navigate to in order to show videoWebpage
 * @returns {React.ReactElement} Component
 */
const Video: FC<VideoProps> = ({
  videoFile,
  videoWebpage,
  videoWebpagePlayerOnly,
  videoWebpageScreen,
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
    (!videoWebpage || !videoWebpageScreen)
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
       * Ideally we use the MP4 videoFile so we can play it using a native player
       * As a fallback we use videoWebpagePlayerOnly to show the video inside a small webview (it should look like just a normal video player, not a web page) on the screen they're already on
       * As a second fallback if there is a videoWebpage we give the user a link to watch the video in a web view on another screen
       */}
      {videoFile && useVideoFileIfAvailable ? (
        <VideoComponent
          controls
          onError={error => {
            setUseVideoFileIfAvailable(false)
            console.error('Error loading MP4 video file', error)
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
        <TextAndArrow
          fontSize="sm"
          onPress={() =>
            navigate(videoWebpageScreen as keyof RootStackParamList, {
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
