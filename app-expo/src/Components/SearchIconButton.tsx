import React, { FC } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components/native'

interface SearchIconButtonProps {
  onPress: () => void
}

const EventSearchView = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 54px;
`

const SearchIconButton: FC<SearchIconButtonProps> = ({ onPress }) => {
  return (
    <EventSearchView onPress={onPress}>
      <FontAwesome name="search" size={38} />
    </EventSearchView>
  )
}

export default SearchIconButton
