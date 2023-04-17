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
/**
 * Returns array of data objects with three properties: WelcomeImage component, title, and text
 * @returns {React.ReactElement} Component
 */
export interface WelcomeSlide {
  image: JSX.Element
  title: string
  text: string
}

export function WelcomeSlides() {
  return [
    {
      image: <WelcomeImage source={Welcome} resizeMode={'contain'} />,
      title: 'WELCOME',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu nisl vitae nisl lobortis rutrum.',
    },
    {
      image: <WelcomeImage source={Volunteer} resizeMode={'contain'} />,
      title: 'VOLUNTEER',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu nisl vitae nisl lobortis rutrum.',
    },
    {
      image: <WelcomeImage source={MakeAnImpact} resizeMode={'contain'} />,
      title: 'MAKE AN IMPACT',
      text: 'In the first year of the STA our volunteers saved the third sector in Scotland over £1m',
    },
  ]
}
