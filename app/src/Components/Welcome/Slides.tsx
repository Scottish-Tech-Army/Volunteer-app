import React from 'react'
import {Image} from 'react-native'
import tempPic from '@/Assets/Images/ComingSoon.png'

export interface Slides {
    image?: Image,
    title?: string,
    text?:string
}

export function MySlides() {

    return [
        {
            image:<Image style={{height:283, width:378}} source={tempPic}></Image>,
            title: "Welcome",
            text: "Lorem Ipsum"
        },
        {
            image:<Image source={tempPic}></Image>,
            title: "Volunteer",
            text: "Lorem Ipsum"
        },
        {
            image:<Image source={tempPic}></Image>,
            title: "Make an Impact",
            text: "In the first year of the STA our volunteers saved the third sector in Scotland over £1m"
        }

    ]
}