import React from 'react'
import SafeArea from '@/Components/SafeArea'
import ProjectFullDetails from '@/Components/Project/ProjectFullDetails'
import { Project } from '@/Services/modules/projects/index'
import Theme from '@/Theme/OldTheme'

const ProjectDetailContainer = (props: {
  route: { params: { item: Project } }
}) => {
  const { item } = props.route.params

  return (
    <SafeArea>
      <Theme>
        <ProjectFullDetails project={item} />
      </Theme>
    </SafeArea>
  )
}

export default ProjectDetailContainer
