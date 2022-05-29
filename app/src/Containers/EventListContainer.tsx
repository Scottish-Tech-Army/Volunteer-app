import React, { FC, useEffect } from 'react'
import styled from 'styled-components/native'
import SafeArea from '@/Components/SafeArea'
import TopOfApp from '@/Components/TopOfApp'
import EventReturnedList from '@/Components/Event/EventReturnedList'
import { SafeAreaView, Text } from 'react-native'
import Theme from '@/Theme/OldTheme'
import { Events, useLazyFetchAllEventsQuery } from '@/Services/modules/events'

interface EventProps {
  data: Events
}

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

const EventListContainer = () => {
  const [fetchAllEvents, { data: events }] = useLazyFetchAllEventsQuery()

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

export default EventListContainer
