import React from 'react'
import styled from 'styled-components/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const FreeSearchInput = styled.TextInput`
  flex: 1;
  padding: 0;
  margin-left: 10px;
`
const FreeSearchViewContainer = styled.View`
  width: 70%;
  height: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #3c3c3b;
  border-radius: 15px;
  margin: 0 auto;
  margin-top: 10px;
`

const SearchIcon = styled(FontAwesome)`
  margin-left: 10px;
`

const FreeSearchBar = ({
  handleSearch,
  handleSubmit,
}: {
  handleSearch: (text: string) => void
  handleSubmit: () => void
}) => {
  return (
    <FreeSearchViewContainer>
      <SearchIcon name="search" size={18} color="#3C3C3B" />
      <FreeSearchInput
        clearButtonMode="always"
        enablesReturnKeyAutomatically
        maxLength={20}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />
    </FreeSearchViewContainer>
  )
}

export default FreeSearchBar
