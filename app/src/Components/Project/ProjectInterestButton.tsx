import React, { FC } from 'react'
import styled from 'styled-components/native'
import { navigate } from '@/Navigators/utils'
import { Project } from '@/Services/modules/projects'

interface ProjectInterestButtonProps {
  project: Project
}

const Button = styled.TouchableOpacity`
  display: flex;
  margin-right: 5px;
  align-self: flex-end;
  border: ${props => `2px solid ${props.theme.colors.staBlack}`};
  border-radius: 20px;
  padding: 5px 10px 5px 10px;
`

const ButtonText = styled.Text`
  font-size: 18px;
  justify-content: center;
`

const ProjectInterestButton: FC<ProjectInterestButtonProps> = ({ project }) => {
  return (
    <Button
      onPress={() => {
        navigate('ProjectRegisterInterest', { project })
      }}
    >
      <ButtonText>Register Interest</ButtonText>
    </Button>
  )
}

export default ProjectInterestButton
