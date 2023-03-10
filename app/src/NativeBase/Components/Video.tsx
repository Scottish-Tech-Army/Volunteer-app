/**
 * @file shows a video in a video player
 */

import React from 'react'
import ReactNativeVideo from 'react-native-video'
import { Center } from 'native-base'

interface VideoProps {
  url: string
}

/**
 * A functional component that renders a video player with a given video URL.
 * @param {string} props.url - The URL of the video to be played.
 * @returns {JSX.Element|null} - Renders a video in a video player, or null if no URL is provided or the video is not accessible.
 */
const Video = ({ url }: VideoProps) => {
  if (!url) return null

  return (
    <Center>
      <ReactNativeVideo
        source={{ uri: url }}
        paused
        style={{ width: 359, height: 250 }}
        controls
      />
    </Center>
  )
}

export default Video
