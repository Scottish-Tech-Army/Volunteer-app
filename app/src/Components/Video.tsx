// Show a video

import React, { FC } from 'react'
import VideoComponent from 'react-native-video'
import styled from 'styled-components/native'

interface VideoProps {
  url: string
}

const VideoView = styled.View`
  margin: 10px 0;
`

const Video: FC<VideoProps> = ({ url }) => {
  if (!url) return null

  return (
    <VideoView>
      <VideoComponent
        source={{ uri: url }}
        paused
        style={{ width: 330, height: 250 }}
        controls
      />
    </VideoView>
  )
}

export default Video
