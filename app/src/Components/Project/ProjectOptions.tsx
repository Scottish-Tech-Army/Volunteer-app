import React from 'react'
import styled from 'styled-components/native'
import underDevelopmentAlert from '../../Utils/UnderDevelopmentAlert'

const ProjectOptionsView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 23px 10px;
`

const ProjectOptionsText = styled.Text`
  font-size: 18px;
`

const ProjectOptionsTouch = styled.TouchableOpacity``

const ProjectOptions = () => {
  return (
    <ProjectOptionsView>
      <ProjectOptionsTouch onPress={underDevelopmentAlert}>
        <ProjectOptionsText>All projects</ProjectOptionsText>
      </ProjectOptionsTouch>

      <ProjectOptionsTouch onPress={underDevelopmentAlert}>
        <ProjectOptionsText>Saved Projects</ProjectOptionsText>
      </ProjectOptionsTouch>
      <ProjectOptionsTouch onPress={underDevelopmentAlert}>
        <ProjectOptionsText>My Projects</ProjectOptionsText>
      </ProjectOptionsTouch>
    </ProjectOptionsView>
  )
}

export default ProjectOptions
