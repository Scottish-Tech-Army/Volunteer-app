/**
 * @file Projects search screen container.
 */

import React, { useState } from 'react'
import Fuse from 'fuse.js' // fuzzy text search - see docs at https://fusejs.io
import { ScrollView } from 'native-base'
import { useSelector } from 'react-redux'
import { ListRouteParams, ListSearch, ListType } from './ListContainer'
import ChoicesList, {
  ChoicesListChoice,
  ChoicesListColour,
  ChoicesListFontStyle,
} from '../Components/ChoicesList'
import FreeSearchBar from '../Components/FreeSearchBar'
import SegmentedPicker, {
  SegmentedPickerOption,
} from '../Components/SegmentedPicker'
import { navigate, RootStackParamList } from '@/Navigators/utils'
import {
  Projects,
  ProjectsSearchField,
  ProjectSector,
  ProjectTechnology,
} from '@/Services/modules/projects'
import {
  roleGroups,
  RoleGroupName,
} from '@/Services/modules/projects/roleGroups'
import { ProjectsState } from '@/Store/Projects'
import { searchByArray, fuzzySearchByArray } from '@/Utils/Search'

enum Tab {
  Roles = 'Roles',
  Tech = 'Tech',
  Causes = 'Causes',
}

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
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Roles)
  const tabs = Object.values(Tab).map(
    tab =>
      ({
        text: tab,
        onPress: () => setSelectedTab(tab),
        isSelected: tab === selectedTab,
      } as SegmentedPickerOption),
  )

  // Define which quick search options to use

  const quickSearchRoleGroupNames: RoleGroupName[] = [
    RoleGroupName.WebDeveloper,
    RoleGroupName.TechSupport,
    RoleGroupName.UIUX,
    RoleGroupName.Researcher,
    RoleGroupName.BAPM,
    RoleGroupName.ScrumMaster,
  ]
  const quickSearchRoleChoices = quickSearchRoleGroupNames.map(
    roleGroupName =>
      ({
        text: roleGroupName,
        onPress: () =>
          handleQuickSearchSubmit(ProjectsSearchField.Role, roleGroupName),
      } as ChoicesListChoice),
  )

  const quickSearchTechnologies = Object.values(ProjectTechnology).map(
    technology =>
      ({
        text: technology,
        onPress: () =>
          handleQuickSearchSubmit(ProjectsSearchField.Skills, technology),
      } as ChoicesListChoice),
  )

  const quickSearchCauses = Object.values(ProjectSector).map(
    cause =>
      ({
        text: cause,
        onPress: () =>
          handleQuickSearchSubmit(ProjectsSearchField.Sector, cause),
      } as ChoicesListChoice),
  )

  // Define colour and style to use for quick search options
  const quickSearchListColour = ChoicesListColour.primary
  const quickSearchListStyle = ChoicesListFontStyle.mediumLight

  // Ensure job title searches find related roles
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

    navigate(
      'SearchResults' as keyof RootStackParamList,
      {
        type: ListType.Projects,
        search: {
          results,
          description,
        } as ProjectSearch,
      } as ListRouteParams,
    )
  }

  const handleFreeTextSubmit = (freeTextSearchQuery: string) => {
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

    navigate(
      'SearchResults' as keyof RootStackParamList,
      {
        type: ListType.Projects,
        search: {
          results,
          description,
        } as ProjectSearch,
      } as ListRouteParams,
    )
  }

  return (
    <ScrollView>
      <FreeSearchBar handleSubmit={handleFreeTextSubmit} marginBottom="10" />

      <SegmentedPicker marginBottom="5" options={tabs} />

      {selectedTab === Tab.Roles && (
        <ChoicesList
          choices={quickSearchRoleChoices}
          colour={quickSearchListColour}
          style={quickSearchListStyle}
        />
      )}

      {selectedTab === Tab.Tech && (
        <ChoicesList
          choices={quickSearchTechnologies}
          colour={quickSearchListColour}
          style={quickSearchListStyle}
        />
      )}

      {selectedTab === Tab.Causes && (
        <ChoicesList
          choices={quickSearchCauses}
          colour={quickSearchListColour}
          style={quickSearchListStyle}
        />
      )}
    </ScrollView>
  )
}

export default ProjectSearchContainer
