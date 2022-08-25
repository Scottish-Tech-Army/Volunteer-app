//Data to be rendered in the flatlist 'WelcomeSlider'

import React from 'react'
import {Image} from 'react-native'
import Welcome from '@/Assets/Images/Welcome.png'
import Volunteer from '@/Assets/Images/Volunteer.png'
import MakeAnImpact from '@/Assets/Images/MakeAnImpact.png'
import styled from 'styled-components/native'

const WelcomeImage = styled.Image`
    height:54%;
    width:378px;
`

export function WelcomeSlides() {

    return [
        {
            image:<WelcomeImage source={Welcome} resizeMode={'contain'}></WelcomeImage>,
            title: "Welcome",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu nisl vitae nisl lobortis rutrum."
        },
        {
            image:<WelcomeImage source={Volunteer} resizeMode={'contain'}></WelcomeImage>,
            title: "Volunteer",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu nisl vitae nisl lobortis rutrum."
        },
        {
            image:<WelcomeImage source={MakeAnImpact} resizeMode={'contain'}></WelcomeImage>,
            title: "Make an Impact",
            text: "In the first year of the STA our volunteers saved the third sector in Scotland over £1m"
        }

    ]
}