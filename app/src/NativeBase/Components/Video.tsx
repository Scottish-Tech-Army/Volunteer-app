/**
 * @file shows a video in a video player
 */

import React, { useState, useEffect } from 'react'
import Video from 'react-native-video'
import { Center } from 'native-base'

interface VideoProps {
  url: string
}

/**
 * A functional component that renders a video player with a given video URL.
 * @param {string} props.url - The URL of the video to be played.
 * @returns {JSX.Element|null} - Renders a video in a video player, or null if no URL is provided or the video is not accessible.
 */
const VideoComponent = ({ url }: VideoProps) => {
  const [isAccessible, setIsAccessible] = useState<boolean | null>(null)

  if (!url) return null

  useEffect(() => {
    fetch(url)
      .then(response => {
        console.log('response.status', response.status)
        if (response.status === 200) {
          setIsAccessible(true)
        } else {
          throw new Error('Error loading video')
        }
      })
      .catch(error => {
        setIsAccessible(false)
      })
  }, [url])

  if (isAccessible) {
    return (
      <Center>
        <Video
          source={{ uri: url }}
          paused
          style={{ width: 359, height: 250 }}
          controls
        />
      </Center>
    )
  }
  return null
}

export default VideoComponent
