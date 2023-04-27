/**
 * @file A container for the form for the user to register interest in taking part in a volunteer project.
 */

import React from 'react'
import ProjectRegisterInterest from '../Components/Project/ProjectRegisterInterest'
import { Project } from '@/Services/modules/projects/index'

const ProjectRegisterInterestContainer = (props: {
  route: { params: { project: Project } }
}) => {
  const { project } = props.route.params

  return <ProjectRegisterInterest project={project} />
}

export default ProjectRegisterInterestContainer
