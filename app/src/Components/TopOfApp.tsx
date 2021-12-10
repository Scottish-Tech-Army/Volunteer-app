import React from 'react'
import Logo from './StaLogo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components/native'

const TopView = styled.View`
  color: ${props => props.theme.colors.staBlack};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const BurgerView = styled.View`
  margin-right: 16px;
  margin-top: 10px;
`

const TopOfApp = () => {
  return (
    <TopView>
      <Logo />
      <BurgerView>
        <FontAwesome name="bars" size={32} />
      </BurgerView>
    </TopView>
  )
}

export default TopOfApp
