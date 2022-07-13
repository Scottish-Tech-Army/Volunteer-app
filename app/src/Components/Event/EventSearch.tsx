import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components/native'
import { navigate } from '@/Navigators/utils'

const EventSearchView = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 54px;
`

const EventSearch = () => {
  return (
    <EventSearchView onPress={() => { navigate('EventSearch', '') }}>
      <FontAwesome name="search" size={38} />
    </EventSearchView>
  )
}

export default EventSearch
