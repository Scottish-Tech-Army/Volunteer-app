import React, { FC } from 'react'
import styled from 'styled-components/native'
import ProjectSummary from './ProjectSummary'
import { Projects } from './types'

interface ProjectReturnedListProps {
  data: Projects
}

const ScrollableListWrapper = styled.ScrollView`
  height: 60%;
`

const ProjectReturnedList: FC<ProjectReturnedListProps> = ({ data }) => {
  return (
    <ScrollableListWrapper>
      <ProjectSummary data={data} />
    </ScrollableListWrapper>
  )
}

export default ProjectReturnedList
