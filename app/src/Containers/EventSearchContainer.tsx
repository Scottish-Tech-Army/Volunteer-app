import React, { useState, useEffect, SetStateAction } from 'react'
import styled from 'styled-components/native'
import { ScrollView, SafeAreaView, Button, Text } from 'react-native'
import TopOfApp from '@/Components/TopOfApp'
import underDevelopmentAlert from '@/Utils/UnderDevelopmentAlert'
import { navigate } from '@/Navigators/utils'
import {
  useLazyFetchAllQuery,
  Project,
  Projects,
} from '@/Services/modules/projects'
import DateTimePicker from '@react-native-community/datetimepicker'
import FreeSearchBar from '@/Components/FreeSearchBar';

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
const EventButton = styled.TouchableOpacity`
  width: 28%;
  height: 50px;
  margin: 20px 0px 0px 15px;
  padding: 5px;
  background-color: #e3e3e3;
  border: ${props => `1px solid ${props.theme.colors.staBlack}`};
  display: flex;
  justify-content: center;
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
  const [date, setDate] = useState(new Date()); // initial date value (today)
  const [show, setShow] = useState(false);      // hide modal date picker

  const handleSearch = (input: React.SetStateAction<string>) => {
    console.log(input)
  }
  const handleSubmit = () => {
    console.log('Submit')
  }

  const onChange = (selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TopOfApp />
        <FreeSearchBar
          handleSearch={handleSearch}
          handleSubmit={handleSubmit}
        />
        <SectionView>
          <EventButton
            onPress={underDevelopmentAlert}>
            <EventTitle>Today</EventTitle>
          </EventButton>
          <EventButton
            onPress={underDevelopmentAlert}>
            <EventTitle>This week</EventTitle>
          </EventButton>
          <EventButton
            onPress={underDevelopmentAlert}>
            <EventTitle>This month</EventTitle>
          </EventButton>
        </SectionView>
        <EventButton
          onPress={showDatepicker}>
          <EventTitle>Pick date</EventTitle>
        </EventButton>
        <Label>{date.toLocaleString()}</Label>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            is24Hour={true}
            onChange={onChange}
            style={{ flex: 1 }}
          />
        )}
        <Heading>Popular</Heading>
        <SectionView>
          {PopularSearches.map((event, index) => (
            <EventButton onPress={underDevelopmentAlert} key={index}>
              <EventTitle>{event}</EventTitle>
            </EventButton>
          ))}
        </SectionView>
        <Heading>Project Specific</Heading>
        <SectionView>
          {ProjectSearches.map((event, index) => (
            <EventButton onPress={underDevelopmentAlert} key={index}>
              <EventTitle>{event}</EventTitle>
            </EventButton>
          ))}
        </SectionView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EventSearchContainer
