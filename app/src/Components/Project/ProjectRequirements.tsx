import React, { FC } from 'react'
import styled from 'styled-components/native'

interface ProjectRequirementsProps {
  icon: React.ReactNode
  details: React.ReactNode
}

const RequirementView = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 7px;
`

const RequirementText = styled.Text`
  margin-left: 13px;
`

const ProjectRequirements: FC<ProjectRequirementsProps> = ({
  icon,
  details,
}) => {
  return (
    <RequirementView>
      {icon}
      <RequirementText>{details}</RequirementText>
    </RequirementView>
  )
}

export default ProjectRequirements
