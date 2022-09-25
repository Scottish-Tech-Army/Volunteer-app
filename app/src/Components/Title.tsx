// Text title, e.g. a main title at the top of a screen or a title of an item in a list
// Helps with consistent font sizing

import React, { FC } from 'react'
import styled from 'styled-components/native'

interface TitleProps {
  text: string
  // Use 'list' for a title appearing in a list,
  // 'main' for a single main title on a screen
  // 'subtitle' for a secondary title on a screen
  type: 'list' | 'main' | 'subtitle'
}

const TitleText = styled.Text`
  font-weight: 700;
  font-size: 30px;
`

const Title: FC<TitleProps> = ({ text, type }) => {
  let fontSize
  switch (type) {
    case 'list':
    case 'subtitle':
      fontSize = 18
      break
    case 'main':
      fontSize = 30
      break
  }

  return <TitleText style={{ fontSize }}>{text}</TitleText>
}

export default Title
