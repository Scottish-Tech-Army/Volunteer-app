import React from 'react'
import styled from 'styled-components/native'

const RequirementView = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 7px;
`

const RequirementText = styled.Text`
  margin-left: 13px;
`

const ProjectRequirements = ({ icon, details }) => {
  return (
    <RequirementView>
      {icon}
      <RequirementText>{details}</RequirementText>
    </RequirementView>
  )
}

export default ProjectRequirements
