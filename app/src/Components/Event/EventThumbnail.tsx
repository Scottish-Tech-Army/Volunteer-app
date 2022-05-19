import React from 'react'
import styled from 'styled-components/native'
import comingSoonImg from '@/Assets/Images/ComingSoon.png'

const ThumbnailImage = styled.Image`
  width: 110px;
  height: 100px;
  border-radius: 5px;
  margin-right: 20px;
`

const EventThumbnail = () => {
  return <ThumbnailImage source={comingSoonImg} />
}

export default EventThumbnail
