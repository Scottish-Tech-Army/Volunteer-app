import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import React, { FC } from 'react'
import styled from 'styled-components/native'

interface ProjectAttachmentsProps {
  icon: React.ReactNode
  details: String
}

const AttachmentButton = styled.TouchableOpacity`
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
    <AttachmentButton onPress={underDevelopmentAlert}>
      {icon}
      <AttachmentDetails>{details}</AttachmentDetails>
    </AttachmentButton>
  )
}

export default ProjectAttachments
