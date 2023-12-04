import React, { FC } from 'react'
import styled from 'styled-components/native'

interface SafeAreaProps {
  children: Element
}

const SafeAreaView = styled.SafeAreaView`
  background: ${props => props.theme.colors.appBackground};
  color: ${props => props.theme.colors.staBlack};
  flex: 1;
`

const SafeArea: FC<SafeAreaProps> = ({ children }) => (
  <SafeAreaView>{children}</SafeAreaView>
)

export default SafeArea
