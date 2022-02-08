import React, { FC } from 'react'
import styled from 'styled-components/native'
import ProjectSummary from './ProjectSummary'
import { Projects } from '@/Services/modules/projects'

interface ProjectReturnedListProps {
  data: Projects
  onPress(): void
}

const ScrollableListWrapper = styled.ScrollView`
  height: 60%;
`

const ProjectReturnedList: FC<ProjectReturnedListProps> = ({ data, onPress }) => {
  return (
    <ScrollableListWrapper>
      <ProjectSummary data={data} onPress={onPress} />
    </ScrollableListWrapper>
  )
}

export default ProjectReturnedList
