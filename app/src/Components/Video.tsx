import React, { FC } from 'react'
import VideoComponent from 'react-native-video'
import styled from 'styled-components/native'

interface VideoProps {
    details: string
  }

const VideoView = styled.View`
  margin: 27px 0px 27px 0px;` 
 

const Video: FC<VideoProps> = ({ details }) => {
    if (!details) return null;
        return (
            <VideoView >
            <VideoComponent
                source= {{uri: details}}         
                paused={true}                 
                style={{width: 330, height: 250 }}
                controls={true}
            />
            </VideoView>
        )
    }   

export default Video