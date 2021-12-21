import React, { FC } from 'react'
import styled from 'styled-components/native'
import EventSummary from './EventSummary'
import { Events } from './types'

interface EventReturnedListProps {
    data: Events
}
  
const ScrollableListWrapper = styled.ScrollView`
    height: 60%;
`

const EventReturnedList: FC<EventReturnedListProps> = ({ data }) => {
    return (
        <ScrollableListWrapper>
            <EventSummary data={data} />
        </ScrollableListWrapper>
    )
}
  
export default EventReturnedList