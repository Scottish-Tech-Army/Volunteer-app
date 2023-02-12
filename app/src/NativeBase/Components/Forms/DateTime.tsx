import React, { FC } from 'react'
import DatePicker from 'react-native-date-picker'
import { VStack, Box, Flex, Text } from 'native-base'

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
      <Box marginTop="24px" paddingLeft="24px">
        <Text
          fontSize="12px"
          margin="0px"
          lineHeight="7px"
          color="#939799"
          paddingY="0px"
        >
          {description}
        </Text>
        <Text margin="0px" lineHeight="9px" fontSize="md">
          {value.toLocaleString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </Box>
      <Flex
        height="100px"
        overflow="hidden"
        align="center"
        justify="center"
        marginTop="40px"
        marginBottom="60px"
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
