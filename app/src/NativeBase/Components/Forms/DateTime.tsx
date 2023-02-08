import React, { FC } from 'react'
import DatePicker from 'react-native-date-picker'
import { Box, Text } from 'native-base'

interface DateTimeProps {
  description: string
  maximumDate?: Date
  minimumDate?: Date
  mode: 'date' | 'datetime' | 'time'
  onChange: (date: Date) => void
  value: Date
}

const DateTime: FC<DateTimeProps> = ({
  description,
  maximumDate,
  minimumDate,
  mode,
  onChange,
  value,
}) => {
  return (
    <Box>
      <Text>{description}</Text>
      <DatePicker
        date={value}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        mode={mode}
        onDateChange={onChange}
      />
    </Box>
  )
}

export default DateTime
