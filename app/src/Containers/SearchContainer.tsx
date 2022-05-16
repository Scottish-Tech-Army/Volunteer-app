import React, { useState, useEffect, SetStateAction } from 'react'
import styled from 'styled-components/native'
import { ScrollView, SafeAreaView } from 'react-native'
import TopOfApp from '@/Components/TopOfApp'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import FreeSearchBar from '@/Components/FreeSearchBar'
import { navigate } from '@/Navigators/utils'
import { useLazyFetchAllQuery, Project } from '@/Services/modules/projects'
import { findStringInArray, findStringInString } from '@/Utils/Search'

const Roles = [
  'Web Developer',
  'Tech Support',
  'UI/UX',
  'Researcher',
  'Scrum Master',
  'BA/PM',
]
const Causes = [
  'Health & Social Care',
  'Education & Youth',
  'Arts & Culture',
  'Environment & Conservation',
  'Community Projects',
  'Internal STA',
]
const TechStack = [
  'Java',
  'JavaScript',
  'Python',
  'AWS',
  'React Native',
  'React',
]

const Heading = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin: 15px 15px 0px 15px;
`
const SubHeading = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin: 10px 15px 0px 15px;
`
const SectionView = styled.View`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 180px;
`
const QuickSearchButton = styled.TouchableOpacity`
  width: 28%;
  height: 50px;
  margin: 20px 0px 0px 15px;
  padding: 5px;
  background-color: #e3e3e3;
  border: ${props => `1px solid ${props.theme.colors.staBlack}`};
  display: flex;
  justify-content: center;
`
const QuickSearchTitle = styled.Text`
  display: flex;
  text-align: center;
`

const SearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (input: React.SetStateAction<string>) => {
    setSearchQuery(input)
  }

  const [fetchAll, { data: projects }] = useLazyFetchAllQuery()

  useEffect(() => {
    fetchAll('')
  }, [fetchAll])

  const handlePreDefinedChoiceSubmit = (
    searchField: 'client' | 'description' | 'name' | 'role' | 'skills',
    searchQuery: string,
  ) => {
    let results = [] as Project[] | undefined

    switch (searchField) {
      case 'skills':
        results = projects?.filter(project =>
          findStringInArray(searchQuery, project[searchField]),
        )
        break

      default:
        results = projects?.filter(project =>
          findStringInString(searchQuery, project[searchField]),
        )
        break
    }

    navigate('ProjectSearchResults', { results, searchField, searchQuery })
  }

  const handleFreeTextSubmit = () => {
    const results = projects?.filter(
      project =>
        findStringInString(searchQuery, project.name) ||
        findStringInString(searchQuery, project.role) ||
        findStringInString(searchQuery, project.client) ||
        findStringInString(searchQuery, project.description) ||
        findStringInArray(searchQuery, project.skills),
    )
    navigate('ProjectSearchResults', {
      results,
      searchField: undefined,
      searchQuery,
    })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <TopOfApp />
        <FreeSearchBar
          handleSearch={handleSearch}
          handleSubmit={handleFreeTextSubmit}
        />
        <Heading>Popular Searches</Heading>
        <SubHeading>Roles</SubHeading>
        <SectionView>
          {Roles.map((role, index) => (
            <QuickSearchButton
              onPress={() => handlePreDefinedChoiceSubmit('role', role)}
              key={index}
            >
              <QuickSearchTitle>{role}</QuickSearchTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
        <SubHeading>Causes</SubHeading>
        <SectionView>
          {Causes.map((cause, index) => (
            <QuickSearchButton onPress={underDevelopmentAlert} key={index}>
              <QuickSearchTitle>{cause}</QuickSearchTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
        <SubHeading>Tech Stack / Languages</SubHeading>
        <SectionView>
          {TechStack.map((tech, index) => (
            <QuickSearchButton onPress={underDevelopmentAlert} key={index}>
              <QuickSearchTitle>{tech}</QuickSearchTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchContainer
