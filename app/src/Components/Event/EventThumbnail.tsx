import React, { FC }  from 'react'
import styled from 'styled-components/native'

interface EventThumbnailProps {
    thumbnailUri: string
}

const ThumbnailImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin-right: 10px;
`

const EventThumbnail: FC<EventThumbnailProps> = ({thumbnailUri}) => {
  return (
    <ThumbnailImage source={{ uri: thumbnailUri }}/>
  )
}

export default EventThumbnail