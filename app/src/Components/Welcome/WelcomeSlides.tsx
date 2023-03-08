//Data to be rendered in the flatlist 'WelcomeSlider'

import React from 'react'
import { Image, View } from 'react-native'
import Welcome from '@/Assets/Images/Welcome.png'
import Volunteer from '@/Assets/Images/Volunteer.png'
import MakeAnImpact from '@/Assets/Images/MakeAnImpact.png'
import styled from 'styled-components/native'

const WelcomeImage = styled.Image`
    height:55%;
`

export function WelcomeSlides() {
  return [
    {
      image: <WelcomeImage source={Welcome} resizeMode={'contain'} />,
      title: 'Welcome',
      text: "Mobilising Scotland's tech talent for good...",
    },
    {
      image: <WelcomeImage source={Volunteer} resizeMode={'contain'} />,
      title: 'Volunteer',
      text: 'We work in partnership with the technology ecosystem of Scotland to deliver scalable, impactful solutions.',
    },
    {
      image: <WelcomeImage source={MakeAnImpact} resizeMode={'contain'} />,
      title: 'Make an Impact',
      text: 'In the first year of the STA our volunteers saved the third sector in Scotland over £1m',
    },
  ]
}
