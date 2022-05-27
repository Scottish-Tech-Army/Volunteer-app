import React, { FC } from 'react'
import styled from 'styled-components/native'
import comingSoonImg from '@/Assets/Images/ComingSoon.png'

interface EventImageProps {
  url?: string
}

const EventImageImage = styled.Image`
  width: 110px;
  height: 100px;
  border-radius: 5px;
  margin-right: 20px;
`

const EventImage: FC<EventImageProps> = ({ url }) => {
  return <EventImageImage source={url ?? comingSoonImg} />
}

export default EventImage
