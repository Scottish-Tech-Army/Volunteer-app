import React, { FC } from 'react'
import Video from 'react-native-video'
import { Project } from '@/Services/modules/projects/index'

interface ProjectVideoProps {
    project: Project
  }

const ProjectVideo: FC<ProjectVideoProps> = ({ project }) => {
    return (
        <Video
            source={{ uri: 'https://vimeo.com/703391800'}}
            style={{ width: 300, height: 300 }}
            controls={true}
            ref={(ref) => {
                this.player = ref
            }} 
            />
    )
}

export default ProjectVideo
