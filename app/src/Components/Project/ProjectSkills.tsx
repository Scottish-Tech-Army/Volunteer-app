import React, { FC } from 'react'
import styled from 'styled-components/native'
import Entypo from 'react-native-vector-icons/Entypo'

interface ProjectSkillsProps {
  skills: string[]
}

const SkillsView = styled.View`
  display: flex;
  flex-direction: row;
  color: ${props => props.theme.colors.staBlack};
`

const SkillText = styled.Text`
  border: ${props => `1px solid ${props.theme.colors.staBlack}`};
  font-size: 10px;
  border-radius: 4px;
  margin-left: 8.5px;
  padding: 0px 1px 0px 2px;
`

const ProjectSkills: FC<ProjectSkillsProps> = ({ skills }) => {
  return (
    <>
      {skills.map(skill => (
        <SkillsView key={skill}>
          <Entypo name="person-circle-outline" size={16} />
          <SkillText>{skill}</SkillText>
        </SkillsView>
      ))}
    </>
  )
}

export default ProjectSkills
