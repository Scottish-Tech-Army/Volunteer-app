import React from 'react'
import SafeArea from '@/Components/SafeArea'
import ProjectRegisterInterest from '@/Components/Project/ProjectRegisterInterest'
import { Project } from '@/Services/modules/projects/index'
import Theme from '@/Theme/OldTheme'

const ProjectRegisterInterestContainer = (props: {
  route: { params: { project: Project } }
}) => {
  const { project } = props.route.params

  return (
    <SafeArea>
      <Theme>
        <ProjectRegisterInterest project={project} />
      </Theme>
    </SafeArea>
  )
}

export default ProjectRegisterInterestContainer
