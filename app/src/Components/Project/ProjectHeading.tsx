import React, { FC } from 'react'
import styled from 'styled-components/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
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

const ProjectTitle = styled.Text`
  font-weight: 700;
  font-size: 18px;
`

const SaveProjectHeart = styled.TouchableOpacity``

const ProjectHeading: FC<ProjectHeadingProps> = ({ hideSaveProjectIcon, title }) => {
  return (
    <ProjectHeadingView>
      <ProjectTitle>{title}</ProjectTitle>
      {!hideSaveProjectIcon && (
          <SaveProjectHeart onPress={underDevelopmentAlert}>
            <AntDesign name="hearto" size={20} />
          </SaveProjectHeart>
      )}
    </ProjectHeadingView>
  )
}

export default ProjectHeading
