import React, { FC } from 'react'
import { FlatList } from 'react-native'
import ProjectSummary from './ProjectSummary'
import { Projects } from '@/Services/modules/projects'

interface ProjectReturnedListProps {
  data: Projects
  onPress(): void
}

const ProjectReturnedList: FC<ProjectReturnedListProps> = ({ data, onPress }) => {
  return (
    <FlatList 
      data={data}
      keyExtractor={ (project) => project.key}
      renderItem={ ({ item }) => {
        return <ProjectSummary project={item} onPress={onPress} ></ProjectSummary>;
      }}
    />
  )
}

export default ProjectReturnedList
