import React from 'react'
import styled from 'styled-components/native'

interface SubmitButtonProps {
  disabled: Boolean
  onPress: () => void
  text: String
}

const Button = styled.TouchableOpacity`
  border: ${props => `2px solid ${props.theme.colors.staBlack}`};
  border-radius: 20px;
  display: flex;
  margin: 30px 0;
  padding: 5px 10px 5px 10px;
  width: 100%;
`

const ButtonText = styled.Text`
  font-size: 18px;
  justify-content: center;
  text-align: center;
`

const SubmitButton: FC<SubmitButtonProps> = ({ disabled, onPress, text }) => {
  return (
    <Button disabled={disabled} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  )
}

export default SubmitButton
