import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components/native'
import { navigate } from '@/Navigators/utils'

const SearchView = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 54px;
`

const ProjectSearch = () => {
  return (
    <SearchView onPress={() => { navigate('Search', '') }}>
      <FontAwesome name="search" size={38} />
    </SearchView>
  )
}

export default ProjectSearch
