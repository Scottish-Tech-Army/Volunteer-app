/**
 * @file Project Attachments
 */
/**
 * Displays the attachment button
 */
import { navigate } from '@/Navigators/utils'
import React, { FC } from 'react'
import styled from 'styled-components/native'

interface ProjectAttachmentsProps {
  icon: React.ReactNode
  details: string
  url: string
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

const ProjectAttachments: FC<ProjectAttachmentsProps> = ({
  icon,
  details,
  url,
}) => {
  // Project Attachments will not be displayed if URL is null or not a validate PDF format (.pdf)
  if (!url || !url.match('.pdf')) return null
  return (
    <AttachmentButton onPress={() => navigate('ProjectScope', { pdf: url })}>
      {icon}
      <AttachmentDetails>{details}</AttachmentDetails>
    </AttachmentButton>
  )
}

export default ProjectAttachments
