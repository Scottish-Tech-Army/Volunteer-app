/**
 * @file displays the project attachment link
 */
import React from 'react'
import { navigate } from '@/Navigators/utils'
import { Link } from 'native-base'

interface ProjectAttachmentsProps {
  details: string
  url: string
}

/**
 * Displays the attachment link
 * @param {ProjectAttachmentProps} props the props for this component
 * @param {string} props.details details the text for the attachment button
 * @param {string} props.url url of attachment, the project scope pdf
 * @returns {ReactElement|null} React element that renders the attachment link, or null if not valid
 */
const ProjectAttachments = ({ details, url }: ProjectAttachmentsProps) => {
  // Project Attachments will not be displayed if URL is null or not a validate format
  if (!url || !url.match('drive.google.com')) return null
  return (
    <Link
      _text={{ fontSize: 'xs' }}
      onPress={() => navigate('ProjectScope', { url })}
    >
      {details}
    </Link>
  )
}

export default ProjectAttachments
