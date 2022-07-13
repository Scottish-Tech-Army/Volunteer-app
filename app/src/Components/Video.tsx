import React, { FC } from 'react'
import Video from 'react-native-video'
import styled from 'styled-components/native'

interface VideoProps {
    details: string
  }

const VideoView = styled.View`
  margin: 27px 0px 27px 0px;` 
 

const ProjectVideo: FC<VideoProps> = ({ details }) => {
    if (!details) return null;
        return (
            <VideoView >
            <Video
                source= {{uri: details}}         
                paused={true}                 
                style={{width: 330, height: 250 }}
                controls={true}
            />
            </VideoView>
        )
    }   

export default ProjectVideo