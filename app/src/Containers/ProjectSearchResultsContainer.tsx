import React from 'react'
import styled from 'styled-components/native'
import TopOfApp from '@/Components/TopOfApp'
import { Projects } from '@/Services/modules/projects'
import ProjectReturnedList from '@/Components/Project/ProjectReturnedList'
import ProjectFilterSort from '@/Components/Project/ProjectFilterSort'
import { Text, SafeAreaView } from 'react-native'

const SafeArea = styled.SafeAreaView`
  background: ${props => props.theme.colors.appBackground};
  color: ${props => props.theme.colors.staBlack};
  flex: 1;
`
const SearchTerm = styled.Text`
  font-size: 18px;
  margin: 15px 15px 0px 15px;
  text-align: center;
`

const ProjectSearchResultsContainer = (props: {
  route: {
    params: {
      results: Projects
      searchField: string | undefined
      searchQuery: string
    }
  }
}) => {
  const { results, searchField, searchQuery } = props.route.params

  if (results) {
    return (
      <SafeArea>
        <TopOfApp />
        <SearchTerm>
          Results for {searchField === 'sector' ? 'cause' : searchField} "{searchQuery}"
        </SearchTerm>
        {Boolean(results.length) && <ProjectFilterSort />}
        <ProjectReturnedList data={results} mode="search" />
      </SafeArea>
    )
  } else {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }
}

export default ProjectSearchResultsContainer
