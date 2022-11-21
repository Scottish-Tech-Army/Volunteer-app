/**
 * @file displays the project attachment button
 */
import { navigate } from '@/Navigators/utils'
import React, { FC, ReactElement } from 'react'
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
/**
 * Displays the attachment button
 * @param {string} url of project scope url
 * @returns {ReactElement} project attachment button and text
 */
const ProjectAttachments: FC<ProjectAttachmentsProps> = ({
  icon,
  details,
  url,
}) => {
  // Project Attachments will not be displayed if URL is null or not a validate format
  if (!url || !url.match('drive.google.com')) return null
  return (
    <AttachmentButton onPress={() => navigate('ProjectScope', { url })}>
      {icon}
      <AttachmentDetails>{details}</AttachmentDetails>
    </AttachmentButton>
  )
}

export default ProjectAttachments
