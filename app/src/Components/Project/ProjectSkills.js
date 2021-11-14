import React from 'react'
import styled from 'styled-components/native'
import { Entypo } from '@expo/vector-icons'

const SkillsView = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 17px;
  color: ${props => props.theme.colors.staBlack};
`

const SkillText = styled.Text`
  border: ${props => `2px solid ${props.theme.colors.staBlack}`};
  border-radius: 4px;
  margin-left: 8.5px;
  padding: 0px 1px 0px 1px;
`

const ProjectSkills = ({ skills }) => {
  return (
    <SkillsView>
      <Entypo name="tools" size={16} />
      {skills.map((skill, index) => (
        <SkillText key={index}>{skill}</SkillText>
      ))}
    </SkillsView>
  )
}

export default ProjectSkills
