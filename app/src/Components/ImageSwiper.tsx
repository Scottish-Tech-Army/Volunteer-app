// Image swiper -- user can swipe left-to-right to see multiple images
// (a bit like on an Instagram post that has more than one photo)

// Automatically adjusts to fill the available width in its parent component
// Automatically adjusts to the height of the tallest image (generally looks best if you use all landscape images or all portrait images)

import React, { FC, useState } from 'react'
import { ImageSourcePropType, StyleSheet } from 'react-native'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import styled from 'styled-components/native'
import ImageLarge from './ImageLarge'

interface ImageSwiperProps {
  images: (string | ImageSourcePropType)[]
}

const ImageSwiperContainer = styled.View`
  background-color: white;
  border-radius: 25px;
  width: 100%;
`

const ImageSwiper: FC<ImageSwiperProps> = ({ images }) => {
  const [containerWidth, setContainerWidth] = useState(0)

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 25,
      width: containerWidth,
    },
    pagination: {
      marginBottom: -45,
    },
    paginationItem: {
      height: 10,
      marginLeft: 5,
      marginRight: 5,
      width: 10,
    },
  })

  return (
    <ImageSwiperContainer
      // Get the available width when the component is created -- we use this to set the size of the SwiperFlatList component
      onLayout={onLayoutEvent => {
        const { width } = onLayoutEvent.nativeEvent.layout
        setContainerWidth(width)
      }}
    >
      <SwiperFlatList
        data={images}
        paginationActiveColor="grey"
        paginationDefaultColor="lightgrey"
        paginationStyle={styles.pagination}
        paginationStyleItem={styles.paginationItem}
        renderItem={({ item }) => (
          <ImageLarge containerWidth={containerWidth} image={item} />
        )}
        showPagination
        style={styles.container}
      />
    </ImageSwiperContainer>
  )
}

export default ImageSwiper
