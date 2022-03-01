import React from 'react'
import styled from 'styled-components/native'

const Button = styled.TouchableOpacity`
  display: flex;
  margin-right: 5px;
  alignSelf: flex-end; 
  border: ${props => `2px solid ${props.theme.colors.staBlack}`};
  border-radius: 20px;
  padding: 5px 10px 5px 10px;
`

const ButtonText = styled.Text`
  font-size: 18px;
  justify-content: center;
`

const ProjectInterestButton = () => {
  return (
    <Button>
      <ButtonText>Register Interest</ButtonText>
    </Button>
  )
}

export default ProjectInterestButton
