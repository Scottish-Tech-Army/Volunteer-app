import React, { FC } from 'react'
import styled from 'styled-components/native'
// import Event component
import { Events } from './types'

interface EventListProps {
    data: Events
}

const EventList: FC<EventListProps> = ({ data }) => {
    const eventList = data.map( (event, index) => {
        return (
            <p>Event Component here</p>
        )
    } )
} 

export default EventList;