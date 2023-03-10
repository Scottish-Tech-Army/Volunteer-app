/**
 * @file the project list screen
 */
import React from 'react'
import ProjectFullDetails from '@/NativeBase/Components/Project/ProjectFullDetails'
import { Project } from '@/Services/modules/projects/index'

/**
 * A screen container that displays details of a project.
 * @param {object} props - The props object containing the route object with project data.
 * @param {Object} props.route - The route object containing the params property.
 * @param {Object} props.route.params - The params object containing the item property.
 * @param {Project} props.route.params.item - The project object
 * @returns {JSX.Element} React element that renders the ProjectFullDetails component with the details of one project.
 */
const ProjectDetailContainer = (props: {
  route: { params: { item: Project } }
}) => {
  const { item } = props.route.params

  return <ProjectFullDetails project={item} />
}

export default ProjectDetailContainer
