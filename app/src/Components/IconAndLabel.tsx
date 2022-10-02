import React, { FC } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import styled from 'styled-components/native'
import ThemeVariables from '@/Theme/Variables'

interface IconAndLabelProps {
  icon: string
  text: string
}

const IconAndLabelView = styled.View`
  margin-right: 20px;
  margin-top: 9px;
  display: flex;
  flex-direction: row;
`

const IconAndLabelText = styled.Text`
  font-weight: 600;
  font-size: ${ThemeVariables.FontSize.small}px;
  margin-left: 10px;
`

const IconAndLabel: FC<IconAndLabelProps> = ({ icon, text }) => {
  return (
    <IconAndLabelView>
      <Feather name={icon} size={28} />
      <IconAndLabelText>{text}</IconAndLabelText>
    </IconAndLabelView>
  )
}

export default IconAndLabel
