/**
 * @file Horizontal flatlist contains welcome, volunteer and make an impact screens
 */

import React, { FC, Ref } from 'react'
import { useTheme } from '@/Hooks'
import styled from 'styled-components/native'
import { Text, Heading } from 'native-base'

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

const TitleText = styled.Text`
    textAlign:center;
    marginTop:7%;
    marginBottom:3%;
`

const SlideText = styled.Text`
    textAlign:center;
    fontSize:18px;
    marginTop:1%;
    marginBottom:1%;
`

const FList = styled.FlatList`
    flex:0.8;
    width:378px;
`

interface SliderProps {
  setActiveIndex: Function
  windowWidth: number
  slideRef: Ref<null>
  slides: Array<Object>
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
            fontFamily="Poppins-medium"
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
