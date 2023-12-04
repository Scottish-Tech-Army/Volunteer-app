// Small thumbnail image in 4:3 aspect ratio
// Useful e.g. for showing an image in a list, like the list of events,
// where we want all images to have the same ratio so they look neat

import React, { FC } from 'react'
import { ImageSourcePropType } from 'react-native'
import styled from 'styled-components/native'

interface ImageThumbnailProps {
  image: string | ImageSourcePropType
}

const ImageThumbnailImage = styled.Image`
  aspect-ratio: ${4 / 3};
  border-radius: 25px;
  height: 105px;
  margin-right: 20px;
  width: auto;
`

const ImageThumbnail: FC<ImageThumbnailProps> = ({ image }) => (
  <ImageThumbnailImage
    resizeMode="contain"
    source={
      typeof image === 'string'
        ? {
            uri: image,
          }
        : image
    }
  />
)

export default ImageThumbnail
