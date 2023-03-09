/**
 * @file Data to be rendered in the flatlist 'WelcomeSlider'
 */

import React from 'react'
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
      text: "Mobilising the UK's tech talent for good...",
    },
    {
      image: <WelcomeImage source={Volunteer} resizeMode={'contain'} />,
      title: 'Volunteer',
      text: "We work in partnership with the UK's technology ecosystem to deliver scalable, impactful solutions.",
    },
    {
      image: <WelcomeImage source={MakeAnImpact} resizeMode={'contain'} />,
      title: 'Make an Impact',
      text: 'In the first year of the STA our volunteers saved the third sector in the UK over £1m.',
    },
  ]
}
