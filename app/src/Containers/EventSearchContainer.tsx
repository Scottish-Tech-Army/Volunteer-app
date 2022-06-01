import React, { useState } from 'react'
import styled from 'styled-components/native'
import { ScrollView, SafeAreaView } from 'react-native'
import TopOfApp from '@/Components/TopOfApp'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import DateTimePicker from '@react-native-community/datetimepicker'
import QuickSearchButton from '@/Components/Forms/QuickSearchButton'
import FreeSearchBar from '@/Components/FreeSearchBar'

const Heading = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin: 15px 15px 0px 15px;
`
const Label = styled.Text`
  font-weight: bold;
  font-size: 14px;
  margin: 15px 15px 0px 15px;
`
const SectionView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const EventTitle = styled.Text`
  display: flex;
  text-align: center;
`

const EventSearchContainer = () => {
  const PopularSearches = [
    'Talk to the hiring manager',
    'Atlassian huddle',
    'Orientation',
    'Showcase',
  ]
  const ProjectSearches = [
    'Sole drop-in',
    'Volunteering app',
    'Eleos drop-in',
    'Climate change app',
  ]

  const [date, setDate] = useState(new Date()) // initial date value (today)
  const [show, setShow] = useState(false) // hide modal date picker

  const handleSearch = (input: React.SetStateAction<string>) => {
    console.log(input)
  }
  const handleSubmit = () => {
    console.log('Submit')
  }

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
  }

  const showDatepicker = () => {
    setShow(true)
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <TopOfApp />
        <FreeSearchBar
          handleSearch={handleSearch}
          handleSubmit={handleSubmit}
        />
        <SectionView>
          <QuickSearchButton onPress={underDevelopmentAlert}>
            <EventTitle>Today</EventTitle>
          </QuickSearchButton>
          <QuickSearchButton onPress={underDevelopmentAlert}>
            <EventTitle>This week</EventTitle>
          </QuickSearchButton>
          <QuickSearchButton onPress={underDevelopmentAlert}>
            <EventTitle>This month</EventTitle>
          </QuickSearchButton>
        </SectionView>
        <QuickSearchButton onPress={showDatepicker}>
          <EventTitle>Pick date</EventTitle>
        </QuickSearchButton>
        <Label>{date.toLocaleString()}</Label>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            is24Hour={true}
            onChange={onChange}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ flex: 1 }}
          />
        )}
        <Heading>Popular</Heading>
        <SectionView>
          {PopularSearches.map((event, index) => (
            <QuickSearchButton onPress={underDevelopmentAlert} key={index}>
              <EventTitle>{event}</EventTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
        <Heading>Project Specific</Heading>
        <SectionView>
          {ProjectSearches.map((event, index) => (
            <QuickSearchButton onPress={underDevelopmentAlert} key={index}>
              <EventTitle>{event}</EventTitle>
            </QuickSearchButton>
          ))}
        </SectionView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EventSearchContainer
