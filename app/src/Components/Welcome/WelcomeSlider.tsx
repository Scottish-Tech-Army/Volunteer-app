import React from 'react'
import {View, Text, Image} from 'react-native'

import { Slides, MySlides } from './Slides'


const WelcomeSlider = (props: Slides) => {
    const slide = MySlides()
    
    
    return (
        <View>
            {slide[0].image}
            <Text style={{textAlign:'center', fontSize:64}}>{slide[2].title}</Text>
            <Text style={{textAlign:'center', fontSize:18}}>{slide[2].text}</Text>
        </View>
    )
}

export default WelcomeSlider