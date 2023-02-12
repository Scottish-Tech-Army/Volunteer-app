/**
 * @file Projects search screen container.
 */

import React, { useState } from 'react'
import Fuse from 'fuse.js' // fuzzy text search - see docs at https://fusejs.io
import styled from 'styled-components/native'
import { ScrollView, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import {
  ListRouteParams,
  ListSearch,
  ListType,
} from '@/Containers/ListContainer'
import FreeSearchBar from '@/NativeBase/Components/FreeSearchBar'
import { navigate } from '@/Navigators/utils'
import {
  Projects,
  ProjectsSearchField,
  ProjectSector,
  ProjectTechnology,
} from '@/Services/modules/projects'
import {
  roleGroups,
  RoleGroup,
  RoleGroupName,
} from '@/Services/modules/projects/roleGroups'
import { searchByArray, fuzzySearchByArray } from '@/Utils/Search'
import QuickSearchButton from '@/Components/Forms/QuickSearchButton'
import { ProjectsState } from '@/Store/Projects'

// define titles for quick search buttons relating to job roles
const topRoleGroups: RoleGroupName[] = [
  RoleGroupName.WebDeveloper,
  RoleGroupName.TechSupport,
  RoleGroupName.UIUX,
  RoleGroupName.Researcher,
  RoleGroupName.BAPM,
  RoleGroupName.ScrumMaster,
]

// define titles for quick search buttons relating to tech stack
const technologies = Object.values(ProjectTechnology)

// define titles for quick search buttons relating to charity sectors
const Causes = Object.values(ProjectSector)

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

export interface ProjectSearch extends ListSearch {
  results: Projects // the projects results for this search
}

/**
 * Container for the user to search projects e.g. by free text, category, skills
 *
 * @returns {React.ReactElement} Component
 */
const ProjectSearchContainer = () => {
  const allProjects = useSelector(
    (state: { projects: ProjectsState }) => state.projects.projects,
  )
  const [freeTextSearchQuery, setFreeTextSearchQuery] = useState('')

  const handleFreeTextChange = (input: React.SetStateAction<string>) => {
    setFreeTextSearchQuery(input)
  }

  // ensure job title searches find related roles
  const getRelatedRoles = (
    possibleRoleSearchQuery: string,
  ): string[] | undefined => {
    const fuse = new Fuse(roleGroups, {
      keys: ['roleNames'],
      minMatchCharLength: 2,
      threshold: 0.1,
    })

    const fuseResults = fuse.search(possibleRoleSearchQuery)

    if (fuseResults.length) {
      const roles = []

      for (const fuseResult of fuseResults) {
        for (const role of fuseResult.item.roleNames) {
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
        allProjects,
        [searchField],
        searchQueries,
      ) as Projects // we need to use fuzzy search as the roles names are not exact (charities use different ways of naming roles)
    } else {
      results = searchByArray(
        allProjects,
        searchField,
        searchQueries,
      ) as Projects // here we do not want to use fuzzy search as it would include unwanted results
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
      allProjects,
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
        <FreeSearchBar
          handleChangeText={handleFreeTextChange}
          handleSubmit={handleFreeTextSubmit}
        />
        <SubHeading>Roles</SubHeading>
        <SectionView>
          {topRoleGroups.map((roleGroupName, index) => (
            <QuickSearchButton
              onPress={() =>
                handleQuickSearchSubmit(ProjectsSearchField.Role, roleGroupName)
              }
              key={index}
            >
              <QuickSearchTitle>{roleGroupName}</QuickSearchTitle>
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
          {technologies.map((technology, index) => (
            <QuickSearchButton
              onPress={() =>
                handleQuickSearchSubmit(ProjectsSearchField.Skills, technology)
              }
              key={index}
            >
              <QuickSearchTitle>{technology}</QuickSearchTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProjectSearchContainer
