import React from 'react'
import Logo from './StaLogo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components/native'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'

const TopView = styled.View`
  color: ${props => props.theme.colors.staBlack};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const BurgerMenu = styled.TouchableOpacity`
  margin-right: 16px;
  margin-top: 10px;
`

const TopOfApp = () => {
  return (
    <TopView>
      <Logo />
      <BurgerMenu onPress={underDevelopmentAlert}>
        <FontAwesome name="bars" size={32} />
      </BurgerMenu>
    </TopView>
  )
}

export default TopOfApp
