import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styled from 'styled-components/native'

const SearchView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 54px;
`

const ProjectSearch = () => {
  return (
    <SearchView>
      <FontAwesome name="search" size={38} />
    </SearchView>
  )
}

export default ProjectSearch
