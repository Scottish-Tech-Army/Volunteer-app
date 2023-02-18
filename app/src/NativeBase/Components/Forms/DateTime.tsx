/**
 * @file DatePicker.
 */

import React, { FC } from 'react'
import DatePicker from 'react-native-date-picker'
import { VStack, Box, Flex, Text } from 'native-base'
import dayjs from 'dayjs'

interface DateTimeProps {
  description: string
  maximumDate?: Date
  minimumDate?: Date
  mode: 'date' | 'datetime' | 'time'
  onChange: (date: Date) => void
  value: Date
  color: string
}

const DateTime: FC<DateTimeProps> = ({
  description,
  maximumDate,
  minimumDate,
  mode,
  onChange,
  value,
  color,
}) => {
  return (
    <VStack>
      <Box marginTop="6" paddingLeft="6">
        <Text
          fontSize="sm"
          margin="0"
          lineHeight="7"
          color="primary.60"
          paddingY="0"
        >
          {description}
        </Text>
        <Text margin="0" lineHeight="9" fontSize="md">
          {dayjs(value).format('DD MMMM, YYYY')}
        </Text>
      </Box>
      <Flex
        height="100"
        overflow="hidden"
        align="center"
        justify="center"
        marginTop="10"
        marginBottom="60"
      >
        <DatePicker
          textColor={color}
          date={value}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          mode={mode}
          onDateChange={onChange}
        />
      </Flex>
    </VStack>
  )
}

export default DateTime
