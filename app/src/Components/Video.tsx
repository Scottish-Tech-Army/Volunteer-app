import React, { FC } from 'react'
import Video from 'react-native-video'
import { Project } from '@/Services/modules/projects/index'

interface VideoProps {
    videoURL: string
  }

const ProjectVideo: FC<VideoProps> = ({ videoURL }) => {
        return (
            <Video  
                source= {{uri: videoURL}}         
                paused={true}                 
                style={{ width: 350, height: 250 }}
                controls={true}
                
            />
        )
    }


export default ProjectVideo