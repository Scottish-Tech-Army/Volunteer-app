// Projects search screen container

import React, { useState, useEffect } from 'react'
import Fuse from 'fuse.js' // fuzzy text search - see docs at https://fusejs.io
import styled from 'styled-components/native'
import { ScrollView, SafeAreaView } from 'react-native'
import TopOfApp from '@/Components/TopOfApp'
import FreeSearchBar from '@/Components/FreeSearchBar'
import { ListRouteParams, ListType } from '@/Containers/ListContainer'
import { navigate } from '@/Navigators/utils'
import {
  useLazyFetchAllProjectsQuery,
  Projects,
  ProjectsSearchField,
  RolesRelated,
} from '@/Services/modules/projects'
import { searchByArray, fuzzySearchByArray } from '@/Utils/Search'
import QuickSearchButton from '@/Components/Forms/QuickSearchButton'

// define titles for quick search buttons relating to job roles
const Roles = [
  'Web Developer',
  'Tech Support',
  'UI/UX',
  'Researcher',
  'Scrum Master',
  'BA/PM',
]

// define titles for quick search buttons relating to charity sectors
const Causes = [
  'Health & Social Care',
  'Education & Youth',
  'Arts & Culture',
  'Environment & Conservation',
  'Community Projects',
  'Internal STA Project',
]

// define titles for quick search buttons relating to tech stack
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
const QuickSearchTitle = styled.Text`
  display: flex;
  text-align: center;
`

export interface ProjectSearch {
  results: Projects // the projects results for this search
  description?: string // some text to tell the user what the search was for, e.g. the search text they entered
}

const ProjectSearchContainer = () => {
  const [freeTextSearchQuery, setFreeTextSearchQuery] = useState('')

  const handleFreeTextChange = (input: React.SetStateAction<string>) => {
    setFreeTextSearchQuery(input)
  }

  // fetch all projects
  const [fetchAll, { data: projects }] = useLazyFetchAllProjectsQuery()

  useEffect(() => {
    fetchAll('')
  }, [fetchAll])

  // ensure job title searches find related roles
  const getRelatedRoles = (
    possibleRoleSearchQuery: string,
  ): string[] | undefined => {
    const fuse = new Fuse(RolesRelated, {
      keys: ['roles'],
      minMatchCharLength: 2,
      threshold: 0.1,
    })

    const fuseResults = fuse.search(possibleRoleSearchQuery)

    if (fuseResults.length) {
      const roles = []

      for (const fuseResult of fuseResults) {
        for (const role of fuseResult.item.roles) {
          roles.push(role)
        }
      }

      return roles
    }

    return undefined
  }

  const handleQuickSearchSubmit = (
    searchField: ProjectsSearchField,
    searchQueryChoice: string,
  ) => {
    let searchQueries = [] as string[]
    let results = [] as Projects

    searchQueries.push(searchQueryChoice)

    if (searchField === 'role') {
      const relatedRoles = getRelatedRoles(searchQueryChoice)

      if (relatedRoles?.length) {
        searchQueries = searchQueries.concat(relatedRoles)
      }
      results = fuzzySearchByArray(
        projects,
        [searchField],
        searchQueries,
      ) as Projects // we need to use fuzzy search as the roles names are not exact (charities use different ways of naming roles)
    } else {
      results = searchByArray(projects, searchField, searchQueries) as Projects // here we do not want to use fuzzy search as it would include unwanted results
    }

    const description = `${
      searchField === 'sector' ? 'cause' : searchField
    } "${searchQueryChoice}"`

    navigate('Projects', {
      type: ListType.Projects,
      search: {
        results,
        description,
      } as ProjectSearch,
    } as ListRouteParams)
  }

  const handleFreeTextSubmit = () => {
    // Add free text to list of search queries
    const searchQueries = [freeTextSearchQuery]

    // If the free text query matches a group of job roles, add these to the list of search queries too
    const relatedRoles = getRelatedRoles(freeTextSearchQuery)
    if (relatedRoles?.length) {
      searchQueries.push(...relatedRoles)
    }

    const results = fuzzySearchByArray(
      projects,
      [
        { name: 'client', weight: 1 },
        // We reduce the 'weight' (aka importance) put on the description field as it's more likely to return
        //  false positive matches because there's lots of general text in that field
        { name: 'description', weight: 0.5 },
        { name: 'name', weight: 1 },
        { name: 'role', weight: 1 },
        { name: 'skills', weight: 1 },
        { name: 'sector', weight: 1 },
      ],
      searchQueries,
    )

    const description = `"${freeTextSearchQuery}"`

    navigate('Projects', {
      type: ListType.Projects,
      search: {
        results,
        description,
      } as ProjectSearch,
    } as ListRouteParams)
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <TopOfApp />
        <FreeSearchBar
          handleChangeText={handleFreeTextChange}
          handleSubmit={handleFreeTextSubmit}
        />
        <Heading>Popular Searches</Heading>
        <SubHeading>Roles</SubHeading>
        <SectionView>
          {Roles.map((role, index) => (
            <QuickSearchButton
              onPress={() =>
                handleQuickSearchSubmit(ProjectsSearchField.Role, role)
              }
              key={index}
            >
              <QuickSearchTitle>{role}</QuickSearchTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
        <SubHeading>Causes</SubHeading>
        <SectionView>
          {Causes.map((cause, index) => (
            <QuickSearchButton
              onPress={() =>
                handleQuickSearchSubmit(ProjectsSearchField.Sector, cause)
              }
              key={index}
            >
              <QuickSearchTitle>{cause}</QuickSearchTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
        <SubHeading>Tech Stack / Languages</SubHeading>
        <SectionView>
          {TechStack.map((tech, index) => (
            <QuickSearchButton
              onPress={() =>
                handleQuickSearchSubmit(ProjectsSearchField.Skills, tech)
              }
              key={index}
            >
              <QuickSearchTitle>{tech}</QuickSearchTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProjectSearchContainer
