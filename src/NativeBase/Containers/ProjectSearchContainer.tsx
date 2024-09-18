import React, { useState } from 'react'
import { ScrollView, VStack } from 'native-base'
import { useSelector } from 'react-redux'
import ChoicesList, {
  ChoicesListChoice,
  ChoicesListColour,
  ChoicesListFontStyle,
} from '../Components/ChoicesList'
import FreeSearchBar from '../Components/FreeSearchBar'
import TagButtons from '../Components/TagButtons' // Import your TagButtons component
import { navigate, RootStackParamList } from '@/Navigators/utils'
import {
  ProjectsSearchField,
  ProjectSector,
  ProjectTechnology,
  Projects,
} from '@/Services/modules/projects'
import { ProjectsState } from '@/Store/Projects'
import { searchByArray, fuzzySearchByArray } from '@/Utils/Search'
import {
  RoleGroupName,
  roleGroups,
} from '@/Services/modules/projects/roleGroups'
import Fuse from 'fuse.js'
import { ListSearch, ListType, ListRouteParams } from './ListContainer'

// Use string literals instead of enum for Tab
type Tab = 'Roles' | 'Tech' | 'Causes'

export interface ProjectSearch extends ListSearch {
  results: Projects // the projects results for this search
}

const ProjectSearchContainer = () => {
  // Fetch all projects from the store
  const allProjects = useSelector(
    (state: { projects: ProjectsState }) => state.projects.projects,
  )

  // State to track the currently active tag
  const [activeTag, setActiveTag] = useState<Tab | null>(null)

  // Define which quick search options to use
  const quickSearchRoleGroupNames: RoleGroupName[] = [
    RoleGroupName.WebDeveloper,
    RoleGroupName.TechSupport,
    RoleGroupName.UIUX,
    RoleGroupName.Researcher,
    RoleGroupName.BAPM,
    RoleGroupName.ScrumMaster,
  ]
  const quickSearchRoleChoices: ChoicesListChoice[] =
    quickSearchRoleGroupNames.map(
      roleGroupName =>
        ({
          text: roleGroupName,
          onPress: () =>
            handleQuickSearchSubmit(ProjectsSearchField.Role, roleGroupName),
        } as ChoicesListChoice),
    )

  const quickSearchTechnologies: ChoicesListChoice[] = Object.values(
    ProjectTechnology,
  ).map(
    technology =>
      ({
        text: technology,
        onPress: () =>
          handleQuickSearchSubmit(ProjectsSearchField.Skills, technology),
      } as ChoicesListChoice),
  )

  const quickSearchCauses: ChoicesListChoice[] = Object.values(
    ProjectSector,
  ).map(
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

  /**
   * Handle tag press logic
   * If the tag is already open, close it by setting activeTag to null.
   * If a different tag is clicked, close the previous one and open the new one.
   */
  const handleTagPress = (tag: Tab) => {
    if (activeTag === tag) {
      setActiveTag(null) // Close the currently active tag
    } else {
      setActiveTag(tag) // Open the selected tag and close others
    }
  }

  return (
    <ScrollView>
      {/* Free Search Bar for entering free text queries */}
      {/* <FreeSearchBar handleSubmit={handleFreeTextSubmit} marginBottom="10" /> */}

      {/* Tag Buttons for Roles, Tech, and Causes */}
      <TagButtons
        iconState={{
          Roles: activeTag === 'Roles',
          Tech: activeTag === 'Tech',
          Causes: activeTag === 'Causes',
        }}
        handleTagPress={handleTagPress}
      />

      <VStack padding="2">
        {/* Show the list of role choices if Roles tab is active */}
        {activeTag === 'Roles' && (
          <ChoicesList
            choices={quickSearchRoleChoices}
            colour={quickSearchListColour}
            style={quickSearchListStyle}
          />
        )}

        {/* Show the list of technology choices if Tech tab is active */}
        {activeTag === 'Tech' && (
          <ChoicesList
            choices={quickSearchTechnologies}
            colour={quickSearchListColour}
            style={quickSearchListStyle}
          />
        )}

        {/* Show the list of causes if Causes tab is active */}
        {activeTag === 'Causes' && (
          <ChoicesList
            choices={quickSearchCauses}
            colour={quickSearchListColour}
            style={quickSearchListStyle}
          />
        )}
      </VStack>
    </ScrollView>
  )
}

export default ProjectSearchContainer
