import React, { FC, useEffect } from 'react'
import styled from 'styled-components/native'
import TopOfApp from '@/Components/TopOfApp'
import EventReturnedList from '@/Components/Event/EventReturnedList'
import { Text, SafeAreaView } from 'react-native'
import Theme from '@/Theme/OldTheme'
import { Events, useLazyFetchAllEventsQuery } from '@/Services/modules/events'

interface EventProps {
  data: Events
}

const SafeArea = styled.SafeAreaView`
  background: ${props => props.theme.colors.appBackground};
  color: ${props => props.theme.colors.staBlack};
  flex: 1;
`

const HorizontalLine = styled.View`
  border: ${props => `1px solid ${props.theme.colors.staBlack}`};
  margin: 0px 75px 10px 75px;
`

const EventList: FC<EventProps> = ({ data }) => {
  return (
    <SafeArea>
      <TopOfApp />
      <HorizontalLine />
      <EventReturnedList data={data} />
    </SafeArea>
  )
}

const EventsContainer = () => {

  const [fetchAllEvents, { data: events }] = useLazyFetchAllEventsQuery()
console.log(useLazyFetchAllEventsQuery());

  useEffect(() => {
    fetchAllEvents('')
  }, [fetchAllEvents])

  if (events) {
    return (
      <Theme>
        <EventList data={events} />
      </Theme>
    )
  } else {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }
}

export default EventsContainer
