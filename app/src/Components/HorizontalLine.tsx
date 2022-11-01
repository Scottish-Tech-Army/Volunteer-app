// A horizontal line, useful as a visual divider between elements

import React, { FC } from 'react'
import styled from 'styled-components/native'

const HorizontalLineView = styled.View`
  border: ${props => `1px solid ${props.theme.colors.staBlack}`};
  margin: 0px 75px 10px 75px;
`

const HorizontalLine: FC = () => <HorizontalLineView />

export default HorizontalLine
