// Image filling all the available width of its container
// Height scales automatically

import React, { FC, useEffect, useState } from 'react'
import { Image, ImageSourcePropType } from 'react-native'
import styled from 'styled-components/native'

interface ImageLargeProps {
  image: string | ImageSourcePropType
  containerWidth?: number
}

const ImageLargeImage = styled.Image`
  border-radius: 25px;
  height: auto;
`

const ImageLarge: FC<ImageLargeProps> = ({ containerWidth, image }) => {
  const [imageDimensions, setImageDimensions] = useState({
    height: 0,
    width: 0,
  })

  const aspectRatio =
    imageDimensions.height && imageDimensions.width
      ? imageDimensions.width / imageDimensions.height
      : 1

  const style = {
    aspectRatio,
    backgroundColor: 'white',
    borderRadius: 25,
    width: containerWidth ?? '100%',
  }

  useEffect(() => {
    // Set the component size based on the size of the source image
    if (typeof image === 'string') {
      // External URLs
      Image.getSize(image, (width, height) => {
        setImageDimensions({ height, width })
      })
    } else {
      // Images imported as modules
      const { width, height } = Image.resolveAssetSource(image)
      setImageDimensions({ height, width })
    }
  }, [image])

  return (
    <ImageLargeImage
      // This resizeMode ensures the whole of the image will always be seen, but means images may be different heights.  See https://reactnative.dev/docs/image#resizemode for other options.
      resizeMode="contain"
      source={
        typeof image === 'string'
          ? {
              uri: image,
            }
          : image
      }
      style={style}
    />
  )
}

export default ImageLarge
