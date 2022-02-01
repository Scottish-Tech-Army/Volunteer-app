import React, { FC }  from 'react'
import { ImageComponent } from 'react-native'
import styled from 'styled-components/native'

interface EventThumbnailProps {
    thumbnail: string
}

const EventThumbnail: FC<EventThumbnailProps> = ({thumbnail}) => {
  return (
    <ImageComponent source={{uri: thumbnail}} />
  )
}

export default EventThumbnail