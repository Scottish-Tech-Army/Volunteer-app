import React, { useEffect } from 'react'
import {View, Text, Image, FlatList,}from 'react-native'
import { useTheme } from '@/Hooks'



const WelcomeSlider = ({activeIndex, setActiveIndex, windowHeight, windowWidth, slideRef, slides, isAndroidRTL}) => {
  
    const { Layout, Fonts } = useTheme()

    const rtlSafeIndex = (i) => (isAndroidRTL ? slides.length - 1 - i : i);

    const renderItem = ({item}) => {
        return(
        <View style={[{flex:1, width:378, alignItems:'center' }]}>
            {item.image}
            <View style={[{width:357, paddingHorizontal:8}]}>
            <Text style={[Fonts.bebasNeue, {textAlign:'center', fontSize:64, marginVertical:25}]}>{item.title}</Text>
            <Text style={[Fonts.poppins, { textAlign:'center', fontSize:18}]}>{item.text}</Text>
            </View>
        </View>
        )
    }

    const handleMomentumScrollEnd = (e) => {
        const offset = e.nativeEvent.contentOffset.x;
        const newIndex = rtlSafeIndex(Math.round(offset / windowWidth));
        setActiveIndex(newIndex)
    }
    

    return (
        <View style={[{flex:0.9, width:378 }]}>
            <FlatList
                ref = {slideRef}
                data={slides} 
                horizontal 
                pagingEnabled 
                showsHorizontalScrollIndicator={false}
                bounces={false}
                style={{flex:1}}
                renderItem={renderItem}
                keyExtractor = {(item, index) => index.toString()}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                extraData={windowWidth} 
                initialNumToRender={3}
                />
                
        </View>
    )
}

export default WelcomeSlider