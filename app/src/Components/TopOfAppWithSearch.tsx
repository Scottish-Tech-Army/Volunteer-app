import React from 'react'
import Logo from './StaLogo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components/native'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import { navigate } from '@/Navigators/utils'


const TopView = styled.View`
  color: ${props => props.theme.colors.staBlack};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const TopRightView = styled.View` 
  display: flex;
  flex-direction: row;
`
const SearchIcon = styled.TouchableOpacity`
  margin-right: 15px;
  margin-top: 10px;
`
const BurgerMenu = styled.TouchableOpacity`
  margin-right: 16px;  
  margin-top: 10px;
`

const TopOfAppWithSearch = () => {
  return (
    <TopView>
      <Logo />
      <TopRightView>
        <SearchIcon onPress={() => { navigate('Search', '') }}>
          <FontAwesome name="search" size={30} />
        </SearchIcon>
        <BurgerMenu onPress={underDevelopmentAlert}>
          <FontAwesome name="bars" size={32} />
        </BurgerMenu>
      </TopRightView>
    </TopView>
  )
}

export default TopOfAppWithSearch
