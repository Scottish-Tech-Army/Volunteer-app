import React, { FC, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import styled from 'styled-components/native'

interface DateTimeProps {
  description: String
  maximumDate?: Date
  minimumDate?: Date
  mode: 'date' | 'datetime' | 'time'
  onChange: (date: Date) => void
  value: Date
}

const DateTimeView = styled.View`
  display: flex;
  flex-direction: column;
`

const DateTimeDescription = styled.Text`
  font-size: 16px;
  margin-bottom: 12px;
  margin-right: 12px;
`

const DateTimeValue = styled.Text`
  font-size: 16px;
`

const DateTime: FC<DateTimeProps> = ({ description, maximumDate, minimumDate, mode, onChange, value }) => {
  return (
    <DateTimeView>
      <DateTimeDescription>{description}</DateTimeDescription>
      <DatePicker
        date={value}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        mode={mode}
        onDateChange={onChange}
      />
    </DateTimeView>
  )
}

export default DateTime
