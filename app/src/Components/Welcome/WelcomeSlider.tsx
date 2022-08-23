import React, { FC, Ref } from 'react'
import {View, Text, Image, FlatList,}from 'react-native'
import { useTheme } from '@/Hooks'
import styled from 'styled-components/native'

const SlideContainer = styled.View`
    flex:1;
    marginVertical:10px;
    width:378px; 
    alignItems:center;
`

const TextContainer = styled.View`
    width:358px;
    paddingHorizontal:8px;
`

const TitleText = styled.Text`
    fontFamily:BebasNeue-Regular;
    textAlign:center;
    fontSize:64px;
    marginVertical:25px;
    color: #3C3C3B;
`

const SlideText = styled.Text`
    fontFamily:Poppins-Medium;
    textAlign:center;
    fontSize:18px;
    color: #3C3C3B;
`

const FList = styled.FlatList`
    flex:0.9;
    width:378px;
`

interface SliderProps {
    setActiveIndex:Function
    windowWidth:number
    slideRef:Ref<null>
    slides:Array<Object>
    isAndroidRTL:boolean
}

const WelcomeSlider: FC<SliderProps> = ({setActiveIndex, windowWidth, slideRef, slides, isAndroidRTL}) => {
  
    const { Fonts } = useTheme()
    const rtlSafeIndex = (i:number) => (isAndroidRTL ? slides.length - 1 - i : i);
    const renderItem = ({item}) => {
        return(
        <SlideContainer >
            {item.image}
            <TextContainer>
            <TitleText >{item.title}</TitleText>
            <SlideText>{item.text}</SlideText>
            </TextContainer>
        </SlideContainer>
        )
    }

    const handleMomentumScrollEnd = (e) => {
        const offset = e.nativeEvent.contentOffset.x;
        const newIndex = rtlSafeIndex(Math.round(offset / windowWidth));
        setActiveIndex(newIndex)
    }
    

    return (
        <FList
            ref = {slideRef}
            data={slides} 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            bounces={false}
            renderItem={renderItem}
            keyExtractor = {(item:Object, index:number) => index.toString()}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            extraData={windowWidth} 
            initialNumToRender={3}
            /> 
    )
}

export default WelcomeSlider