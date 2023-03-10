/**
 * @file the project list screen
 */
import React from 'react'
import ProjectFullDetails from '@/NativeBase/Components/Project/ProjectFullDetails'
import { Project } from '@/Services/modules/projects/index'

/**
 * A screen container that displays details of a project.
 * @param {object} props - The props object containing the route object with project data.
 * @param {Project} props.route.params.item - The project object
 * @returns {JSX.Element} Renders the ProjectFullDetails component with the details of one project.
 */
const ProjectDetailContainer = (props: {
  route: { params: { item: Project } }
}) => {
  const { item } = props.route.params

  return <ProjectFullDetails project={item} />
}

export default ProjectDetailContainer
