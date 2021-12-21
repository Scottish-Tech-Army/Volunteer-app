import React, { FC } from 'react'
import styled from 'styled-components/native'
// import Event component
import { Events, useLazyFetchAllQuery } from '@/Services/modules/events'

interface EventListProps {
    data: Events
}

const EventList: FC<EventListProps> = ({ data }) => {
    const eventList = data.map( (event, index) => {
        return (
            <p>Event Component here</p>
        )
    } )

    return <>{eventList}</>
} 

export default EventList;