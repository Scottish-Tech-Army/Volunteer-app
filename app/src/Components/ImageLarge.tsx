// Image filling all the available width of its container
// Height scales automatically

import React, { FC, useEffect, useState } from 'react'
import { Image, ImageSourcePropType } from 'react-native'
import styled from 'styled-components/native'

interface ImageLargeProps {
  image: string | ImageSourcePropType
}

const ImageLargeImage = styled.Image`
  border-radius: 25px;
  height: auto;
  min-height: 50px;
  width: 100%;
`

const ImageLarge: FC<ImageLargeProps> = ({ image }) => {
  const [imageDimensions, setImageDimensions] = useState({
    height: 1,
    width: 1,
  })

  useEffect(() => {
    if (typeof image === 'string') {
      Image.getSize(image, (width, height) => {
        setImageDimensions({ height, width })
      })
    } else {
      const { width, height } = Image.resolveAssetSource(image)
      setImageDimensions({ height, width })
    }
  }, [image])

  return (
    <ImageLargeImage
      resizeMode="contain"
      source={
        typeof image === 'string'
          ? {
              uri: image,
            }
          : image
      }
      style={{
        aspectRatio: imageDimensions.width / imageDimensions.height,
      }}
    />
  )
}

export default ImageLarge
