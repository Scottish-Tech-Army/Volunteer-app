import React, {useState} from 'react'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import {View, Dimensions} from 'react-native'
import Logo from '@/Assets/Images/LongLogo.png'
import styled from 'styled-components/native'
import GetStartedButton from '@/Components/Welcome/GetStartedButton'
import WelcomeSlider from '@/Components/Welcome/WelcomeSlider'


const StaHeaderImage = styled.Image`
  width: 339px;
  height: 58px;
  margin-top: 22px;
  margin-bottom: 22px;
`
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const WelcomeContainer = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const { Layout, Gutters, Fonts } = useTheme()
    // const { t } = useTranslation()

    return(
        <View style={[Layout.fill, Layout.colVCenter]}>
            <StaHeaderImage source={Logo} />
            <WelcomeSlider activeIndex={activeIndex} windowWidth={windowWidth} windowHeight={windowHeight} setActiveIndex={setActiveIndex}/>
            {/* <PaginationDots /> */}
            <GetStartedButton />
        </View>
    )
}

export default WelcomeContainer