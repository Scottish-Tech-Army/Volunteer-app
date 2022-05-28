import React, { useState, useEffect, SetStateAction } from 'react'
import styled from 'styled-components/native'
import { ScrollView, SafeAreaView } from 'react-native'
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
import DatePicker from 'react-native-datepicker';

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
  const [availableFromDate, setAvailableFromDate] = useState(new Date())

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
        <DatePicker
          style={{ width: 200 }}
          date={availableFromDate}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
        />
        <DateTime
          description="Events from..."
          mode="date"
          onChange={value => console.log(value)}
          value={availableFromDate}
        />
        <DateControls></DateControls>
        <SectionView>
        </SectionView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EventSearchContainer
