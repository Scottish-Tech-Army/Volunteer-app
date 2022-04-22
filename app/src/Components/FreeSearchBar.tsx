import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { navigate } from '@/Navigators/utils'
import { Projects, useLazyFetchAllQuery } from '@/Services/modules/projects'

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

const FreeSearchBar = ({handleSearch, searchQuery }) => {
  const [fetchAll, { data: projects }] = useLazyFetchAllQuery()

  useEffect(() => {
    fetchAll('')
  }, [fetchAll])

  const handleSubmit = () => {
    console.log(searchQuery)
    const result = projects?.filter(project =>
      project.name.includes(searchQuery),
    )
    console.log(result)
    navigate('ProjectSearchResults', { result: result })
  }

  return (
    <FreeSearchViewContainer>
      <SearchIcon name="search" size={18} color="#3C3C3B" />
      <FreeSearchInput
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        clearButtonMode="always"
      />
    </FreeSearchViewContainer>
  )
}

export default FreeSearchBar
