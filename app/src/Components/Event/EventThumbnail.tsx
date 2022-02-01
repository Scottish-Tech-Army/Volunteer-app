import React, { FC }  from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'

interface EventThumbnailProps {
    thumbnailUri: string
}

const ThumbnailView = styled.Text`
    width: 48px;
    height: 48px;
    border-radius: 5px;
    margin-right: 10px;
`

const EventThumbnail: FC<EventThumbnailProps> = ({thumbnailUri}) => {
  return (
    <ThumbnailView>
        <Image source={{
          uri: thumbnailUri,
        }}/>
    </ThumbnailView>
  )
}

export default EventThumbnail