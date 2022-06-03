import React, { useState } from 'react'
import styled from 'styled-components/native'
import { ScrollView, SafeAreaView } from 'react-native'
import TopOfApp from '@/Components/TopOfApp'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import CalendarPicker from 'react-native-calendar-picker'
import QuickSearchButton from '@/Components/Forms/QuickSearchButton'
import FreeSearchBar from '@/Components/FreeSearchBar'

const Heading = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin: 15px 15px 0px 15px;
`
const SectionView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const Label = styled.Text`
  font-weight: bold;
  font-size: 14px;
  margin: 15px 15px 0px 15px;
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
  const handleSearch = (input: React.SetStateAction<string>) => {
    console.log(input)
  }
  const handleSubmit = () => {
    console.log('Submit')
  }
  const [calendarPickerWidth, setCalendarPickerWidth] = useState(0)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const onDateChange = (date: Date, type: string) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setEndDate(date)
    } else {
      setEndDate(date)
      setStartDate(date)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView
        onLayout={onLayoutEvent => {
          const { width } = onLayoutEvent.nativeEvent.layout
          setCalendarPickerWidth(width)
        }}
      >
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
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={new Date()}
          maxDate={new Date(2050, 6, 3)}
          weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
          months={[
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ]}
          onDateChange={onDateChange}
          width={calendarPickerWidth}
        />
        <Label>Start date: {startDate ? startDate.toLocaleString() : ''}</Label>
        <Label>End date: {endDate ? endDate.toLocaleString() : ''}</Label>
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
