/**
 * @file Show a video.
 */

import { navigate, RootStackParamList } from '@/Navigators/utils'
import { Box, Image, Pressable } from 'native-base'
import React, { FC, useEffect, useState } from 'react'
import { Dimensions, Platform } from 'react-native'
import WebView from 'react-native-webview'
import VideoPlaceholder from '../Assets/Images/video-placeholder.png'

interface VideoProps {
  marginBottom?: string
  marginTop?: string
  videoWebpage?: string
  videoWebpagePlayerOnly?: string
  videoWebpageScreen?: keyof RootStackParamList // should be set if videoWebpage is set
}

/**
 * Component showing a video.
 *
 * @param {VideoProps} props The component props
 * @param {string} [props.marginBottom] Bottom margin
 * @param {string} [props.marginTop] Top margin
 * @param {string} [props.videoWebpage] URL of a webpage containing a video player plus probably other branding, text, other videos, etc
 * @param {string} [props.videoWebpagePlayerOnly] URL of a webpage containing simply a video player only (no branding, text, other videos, etc)
 * @param {keyof RootStackParamList} [props.videoWebpageScreen] The screen to navigate to in order to show videoWebpage
 * @returns {React.ReactElement} Component
 */
const Video: FC<VideoProps> = ({
  marginBottom,
  marginTop,
  videoWebpage,
  videoWebpagePlayerOnly,
  videoWebpageScreen,
}) => {
  const aspectRatio = 9 / 16 // 16:9 aspect ratio, which is typical for videos
  const windowWidth = Dimensions.get('window').width
  const [boxWidth, setBoxWidth] = useState(windowWidth)
  // Hide video initially on Android and only show it just after the component has rendered, otherwise Android screen animations combined with WebView can cause a crash
  const [showVideo, setShowVideo] = useState(
    Platform.OS === 'android' ? false : true,
  )
  const videoHeight = boxWidth * aspectRatio
  const [useVideoWebpagePlayer, setUseVideoWebpagePlayer] = useState(true)
  const webViewStyle = {
    minHeight: videoHeight,
    opacity: 0.99, // recommended setting to reduce crashes on Android https://github.com/react-native-webview/react-native-webview/issues/1915
    width: boxWidth,
  }

  useEffect(() => {
    setTimeout(() => setShowVideo(true), 500)
  }, [])

  if (
    (!videoWebpagePlayerOnly || !useVideoWebpagePlayer) &&
    (!videoWebpage || !videoWebpageScreen)
  )
    return null

  return (
    <Box
      display="flex"
      marginBottom={marginBottom ?? 0}
      marginTop={marginTop ?? 0}
      minHeight={videoHeight}
      onLayout={onLayoutEvent => {
        const newBoxWidth = onLayoutEvent.nativeEvent.layout.width
        setBoxWidth(newBoxWidth)
      }}
    >
      {/*
       * Use videoWebpagePlayerOnly to show the video inside a small webview (it should look like just a normal video player, not a web page) on the screen they're already on
       * As a fallback if there is a videoWebpage we show the user a placeholder that links to the video in a web view on another screen
       */}
      {showVideo ? (
        videoWebpagePlayerOnly && useVideoWebpagePlayer ? (
          <WebView
            allowsFullscreenVideo
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            onError={error => {
              setUseVideoWebpagePlayer(false)
              console.error('Error loading video webpage - player only', error)
            }}
            overScrollMode="never" // recommended setting to reduce crashes on Android https://github.com/react-native-webview/react-native-webview/issues/2364
            removeClippedSubviews // recommended setting to reduce crashes on Android https://github.com/react-native-webview/react-native-webview/issues/2364
            source={{ uri: videoWebpagePlayerOnly as string }}
            style={webViewStyle}
          />
        ) : (
          <Pressable
            onPress={() =>
              navigate(videoWebpageScreen as keyof RootStackParamList, {
                url: videoWebpage as string,
              })
            }
          >
            <Image
              alt="Watch video"
              height={videoHeight}
              source={VideoPlaceholder}
              width={boxWidth}
            />
          </Pressable>
        )
      ) : null}
    </Box>
  )
}

export default Video
