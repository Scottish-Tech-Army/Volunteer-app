import React, { FC } from 'react'
import styled from 'styled-components/native'
import AntDesign from 'react-native-vector-icons/AntDesign'

interface ProjectHeadingProps {
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

const SaveProjectHeart = styled.TouchableOpacity`
`

const ProjectHeading: FC<ProjectHeadingProps> = ({ title }) => {
  return (
    <ProjectHeadingView>
      <ProjectTitle>{title}</ProjectTitle>
      <SaveProjectHeart>
        <AntDesign name="hearto" size={20} />
      </SaveProjectHeart>
    </ProjectHeadingView>
  )
}

export default ProjectHeading
