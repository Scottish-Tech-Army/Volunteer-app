import {
  Projects,
  ProjectSector,
  ProjectsSearchField,
  ProjectTechnology,
} from '@/Services/modules/projects'
import { RoleGroupName } from '@/Services/modules/projects/roleGroups'
import { ProjectsState } from '@/Store/Projects'
import { VStack } from 'native-base'
import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { ListSearch } from '../Containers/ListContainer'
import ChoicesList, {
  ChoicesListChoice,
  ChoicesListColour,
  ChoicesListFontStyle,
} from './ChoicesList'
import TagButtons from './TagButtons'

export interface ProjectSearch extends ListSearch {
  results: Projects // the projects results for this search
}
export interface ProjectsTagButtonsFilterProps {
  handleQuickSearchSubmit: (
    searchField: ProjectsSearchField,
    searchQueryChoice: string,
  ) => void
}

const ProjectsTagButtonsFilter: FC<ProjectsTagButtonsFilterProps> = ({
  handleQuickSearchSubmit,
}) => {
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
