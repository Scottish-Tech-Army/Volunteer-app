import React, { FC } from 'react'
import styled from 'styled-components/native'

interface MainTitleProps {
  text: string
}

const TitleText = styled.Text`
  font-weight: 700;
  font-size: 18px;
`

const MainTitle: FC<MainTitleProps> = ({ text }) => {
  return <TitleText>{text}</TitleText>
}

export default MainTitle
