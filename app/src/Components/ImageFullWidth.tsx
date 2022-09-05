// Image filling all the available width of its container
// Height scales automatically

import React, { FC, useEffect, useState } from 'react'
import { Image, ImageSourcePropType } from 'react-native'
import styled from 'styled-components/native'

interface ImageFullWidthProps {
  image: string | ImageSourcePropType
  containerWidth?: number
}

const ImageFullWidthImage = styled.Image`
  border-radius: 25px;
  height: auto;
`

const ImageFullWidth: FC<ImageFullWidthProps> = ({ containerWidth, image }) => {
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
    backgroundColor: 'transparent',
    borderRadius: 25,
    width: containerWidth ?? '100%',
  }

  useEffect(() => {
    // Set the component size based on the size of the source image
    if (typeof image === 'string') {
      // If the image is an external URL...
      Image.getSize(image, (width, height) => {
        setImageDimensions({ height, width })
      })
    } else {
      // Otherwise assume the image is imported as a module
      const { width, height } = Image.resolveAssetSource(image)
      setImageDimensions({ height, width })
    }
  }, [image])

  return (
    <ImageFullWidthImage
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

export default ImageFullWidth
