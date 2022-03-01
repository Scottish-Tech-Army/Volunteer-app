import React, { FC } from 'react'
import styled from 'styled-components/native'

interface ProjectAttachmentsProps {
  icon: React.ReactNode
  details: String
}

const AttachmentView = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 7px;
  margin-left: 45px;
`
const AttachmentDetails = styled.Text`
  font-size: 16px;
  margin-left: 12px;
`

const ProjectAttachments: FC<ProjectAttachmentsProps> = ({ icon, details }) => {
  return (
    <AttachmentView>
      {icon}
      <AttachmentDetails>{details}</AttachmentDetails>
    </AttachmentView>
  )
}

export default ProjectAttachments
