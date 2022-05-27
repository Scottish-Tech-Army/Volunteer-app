import React, { FC } from 'react'
import styled from 'styled-components/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MainTitle from '../MainTitle'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'

interface ProjectHeadingProps {
  hideSaveProjectIcon?: boolean
  title: string
}

const ProjectHeadingView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SaveProjectHeart = styled.TouchableOpacity``

const ProjectHeading: FC<ProjectHeadingProps> = ({
  hideSaveProjectIcon,
  title,
}) => {
  return (
    <ProjectHeadingView>
      <MainTitle text={title} />
      {!hideSaveProjectIcon && (
        <SaveProjectHeart onPress={underDevelopmentAlert}>
          <AntDesign name="hearto" size={20} />
        </SaveProjectHeart>
      )}
    </ProjectHeadingView>
  )
}

export default ProjectHeading
