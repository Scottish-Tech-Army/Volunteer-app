import { navigate, RootStackParamList } from '@/Navigators/utils'
import {
  Projects,
  ProjectSector,
  ProjectsSearchField,
  ProjectTechnology,
} from '@/Services/modules/projects'
import {
  RoleGroupName,
  roleGroups,
} from '@/Services/modules/projects/roleGroups'
import { ProjectsState } from '@/Store/Projects'
import { fuzzySearchByArray, searchByArray } from '@/Utils/Search'
import Fuse from 'fuse.js'
import { VStack } from 'native-base'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  ListRouteParams,
  ListSearch,
  ListType,
} from '../Containers/ListContainer'
import ChoicesList, {
  ChoicesListChoice,
  ChoicesListColour,
  ChoicesListFontStyle,
} from './ChoicesList'
import TagButtons from './TagButtons'

export interface ProjectSearch extends ListSearch {
  results: Projects // the projects results for this search
}

const ProjectsTagButtonsFilter = () => {
  // Fetch all projects from the store
  const allProjects = useSelector(
    (state: { projects: ProjectsState }) => state.projects.projects,
  )

  // State to track the currently active tag (using simple strings)
  const [activeTag, setActiveTag] = useState<string | null>(null)

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
      'Projects' as keyof RootStackParamList,
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
  const handleTagPress = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag)
  }

  return (
    <VStack>
      {/* Tag Buttons for Roles, Tech, and Causes */}
      <TagButtons
        tags={['Roles', 'Tech', 'Causes']} // String tags
        iconState={{
          Roles: activeTag === 'Roles',
          Tech: activeTag === 'Tech',
          Causes: activeTag === 'Causes',
        }}
        handleTagPress={handleTagPress} // String type handler
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

        {/* Show the list of causes if Causes tag is active */}
        {activeTag === 'Causes' && (
          <ChoicesList
            choices={quickSearchCauses}
            colour={quickSearchListColour}
            style={quickSearchListStyle}
          />
        )}
      </VStack>
    </VStack>
  )
}

export default ProjectsTagButtonsFilter
