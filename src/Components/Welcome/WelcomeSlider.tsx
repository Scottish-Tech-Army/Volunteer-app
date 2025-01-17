/**
 * @file Horizontal flatlist contains welcome, volunteer and make an impact screens
 */

import React, { Dispatch, FC, Ref, SetStateAction } from 'react'
import { WelcomeSlide } from './WelcomeSlides'
import styled from 'styled-components/native'
import { Text, Heading } from '@gluestack-ui/themed-native-base'

const SlideContainer = styled.View`
    flex:1;
    width:378px; 
    alignItems:center;
`

const TextContainer = styled.View`
    width:358px;
    height:25%;
    paddingHorizontal:8px;
`

const FList = styled.FlatList`
    flex:0.8;
    width:378px;
`

interface SliderProps {
  setActiveIndex: Dispatch<SetStateAction<number>>
  windowWidth: number
  slideRef: Ref<null>
  slides: WelcomeSlide[]
  isAndroidRTL: boolean
}

const WelcomeSlider: FC<SliderProps> = ({
  setActiveIndex,
  windowWidth,
  slideRef,
  slides,
  isAndroidRTL,
}) => {
  const rtlSafeIndex = (i: number) => (isAndroidRTL ? slides.length - 1 - i : i)
  const renderItem = ({ item }) => {
    return (
      <SlideContainer>
        {item.image}
        <TextContainer>
          <Heading
            mt="4%"
            mb="3%"
            fontFamily="BebasNeue-Regular"
            fontSize="60"
            numberOfLines={1}
            padding="0"
            margin="auto"
          >
            {item.title}
          </Heading>
          <Text
            numberOfLines={3}
            fontFamily="Poppins-Medium"
            fontSize="20"
            padding="0"
            textAlign="center"
            adjustsFontSizeToFit
          >
            {item.text}
          </Text>
        </TextContainer>
      </SlideContainer>
    )
  }

  const handleMomentumScrollEnd = e => {
    const offset = e.nativeEvent.contentOffset.x
    const newIndex = rtlSafeIndex(Math.round(offset / windowWidth))
    setActiveIndex(newIndex)
  }

  return (
    <FList
      ref={slideRef}
      data={slides}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      bounces={false}
      renderItem={renderItem}
      keyExtractor={(item, index: number) => index.toString()}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      extraData={windowWidth}
      initialNumToRender={3}
    />
  )
}

export default WelcomeSlider
