import React from 'react'
import {View, Text, Image} from 'react-native'
import { useTheme } from '@/Hooks'

import { Slides, MySlides } from './Slides'


const WelcomeSlider = (props: Slides) => {
    const slide = MySlides()
    const { Layout, Fonts } = useTheme()
    
    return (
        <View>
            {slide[0].image}
            <Text style={[Fonts.bebasNeue, {textAlign:'center', fontSize:64}]}>{slide[2].title}</Text>
            <Text style={[Fonts.poppins, { textAlign:'center', fontSize:18}]}>{slide[2].text}</Text>
        </View>
    )
}

export default WelcomeSlider