/**
 * @file shows the project role title in a coloured box for use in projects
 */

import React from 'react'
import { Box } from 'native-base'

type ProjectRoleProps = {
  role: string
}

/**
 * A functional component to display the project role title in a coloured tag
 * @param {ProjectRoleProps} props - the props for this component
 * @param {string} props.role - the role title
 * @returns {JSX.Element|null} Renders the project role in a coloured tag, or null if no role
 */
const ProjectRoleTitle = ({ role }: ProjectRoleProps) => {
  const colours = ['blue.20', 'purple.40', 'primary.60', 'primary.40']
  const randomColour = colours[Math.floor(Math.random() * colours.length)]

  if (role) {
    return (
      <Box
        bgColor={randomColour}
        rounded="md"
        style={{ alignSelf: 'flex-start' }}
        marginLeft={2}
        maxHeight="sm"
      >
        {role}
      </Box>
    )
  }
  return null
}

export default ProjectRoleTitle
