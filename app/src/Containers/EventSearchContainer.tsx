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
import DateControls from '@/Components/Forms/DateControls'
import DateTime from '@/Components/Forms/DateTime'
import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';

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
const RangeButton = styled.TouchableOpacity`
  width: 28%;
  height: 50px;
  margin: 20px 0px 0px 15px;
  padding: 5px;
  background-color: #e3e3e3;
  border: ${props => `1px solid ${props.theme.colors.staBlack}`};
  display: flex;
  justify-content: center;
`
const RangeTitle = styled.Text`
  display: flex;
  text-align: center;
`

const EventSearchContainer = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TopOfApp />
        <Heading>Upcoming events</Heading>
        <SectionView>
          <RangeButton
            onPress={underDevelopmentAlert}>
            <RangeTitle>Today</RangeTitle>
          </RangeButton>
          <RangeButton
            onPress={underDevelopmentAlert}>
            <RangeTitle>This week</RangeTitle>
          </RangeButton>
          <RangeButton
            onPress={underDevelopmentAlert}>
            <RangeTitle>This month</RangeTitle>
          </RangeButton>
        </SectionView>
        <Button onPress={showDatepicker} title="Show date picker!" />
        <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
        <DateControls></DateControls>
        <SectionView>
        </SectionView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EventSearchContainer
