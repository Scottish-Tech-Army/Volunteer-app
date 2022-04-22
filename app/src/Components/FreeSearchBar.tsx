import React from 'react'
import styled from 'styled-components/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { View } from 'react-native'

const FreeSearchInput = styled.TextInput`
  flex: 1;
`
const FreeSearchViewContainer = styled.View`
  width: 70%;
  height: 30px;
  flexDirection: row;
  alignItems: center;
  justifyContent: center;
  border: 1px solid #3C3C3B;
  border-radius: 15px;
  margin: 0 auto;
`

const SearchIcon = styled(FontAwesome)`
  margin-left: 10px;
`


const FreeSearchBar = () => {
  return (
    <FreeSearchViewContainer>
      <SearchIcon name="search" size={18} color="#3C3C3B" />
      <FreeSearchInput clearButtonMode="always" />
    </FreeSearchViewContainer>
  )
}

export default FreeSearchBar
