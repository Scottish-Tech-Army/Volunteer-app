import React from 'react'
import {Image} from 'react-native'
import Welcome from '@/Assets/Images/Welcome.png'
import Volunteer from '@/Assets/Images/Volunteer.png'
import MakeAnImpact from '@/Assets/Images/MakeAnImpact.png'

export function WelcomeSlides() {

    return [
        {
            image:<Image style={{height:283, width:378}} source={Welcome}></Image>,
            title: "Welcome",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu nisl vitae nisl lobortis rutrum."
        },
        {
            image:<Image style={{height:283, width:378}} source={Volunteer}></Image>,
            title: "Volunteer",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu nisl vitae nisl lobortis rutrum."
        },
        {
            image:<Image style={{height:283, width:378}} source={MakeAnImpact}></Image>,
            title: "Make an Impact",
            text: "In the first year of the STA our volunteers saved the third sector in Scotland over £1m"
        }

    ]
}