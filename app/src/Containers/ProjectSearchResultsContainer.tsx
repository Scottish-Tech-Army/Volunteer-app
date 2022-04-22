import React, { FC, useEffect } from 'react'
import styled from 'styled-components/native'
import TopOfApp from '@/Components/TopOfApp'
import { Projects, useLazyFetchAllQuery } from '@/Services/modules/projects'
import ProjectReturnedList from '@/Components/Project/ProjectReturnedList'
import ProjectFilterSort from '@/Components/Project/ProjectFilterSort'
import { Text, SafeAreaView } from 'react-native'

/*
interface SearchResultsProps {
    searchResults: Projects
}



const ProjectSearchResultsContainer: FC<SearchResultsProps> = ({ searchResults }) => {
    if (searchResults = [] ) return null;
    return (
        <SafeArea>
            <TopOfApp />
            <ProjectFilterSort />
            <ProjectReturnedList data={searchResults} />
        </SafeArea>
    )
}
*/

const SafeArea = styled.SafeAreaView`
  background: ${props => props.theme.colors.appBackground};
  color: ${props => props.theme.colors.staBlack};
  flex: 1;
`

const ProjectSearchResultsContainer = ({ route }) => {
    const {result} = route.params

    if(result) {
        return (
            <SafeArea>
                <TopOfApp />
                <ProjectFilterSort />
                <ProjectReturnedList data={result} />
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
