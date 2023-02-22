/**
 * @file DatePicker.
 */

import React, { FC, useState, useEffect } from 'react'
import CalendarPicker from 'react-native-calendar-picker'
import { Pressable } from 'react-native'
import { VStack, Box, Text, Input, useColorMode } from 'native-base'
import dayjs from 'dayjs'

interface DateTimeAltProps {
  description: string
  maximumDate?: Date
  minimumDate?: Date
  onChange: (date: Date) => void
  value: Date
}

const DateTimeAlt: FC<DateTimeAltProps> = ({
  description,
  maximumDate,
  minimumDate,
  onChange,
  value,
}) => {
  const [pickerActive, setPickerActive] = useState(false)
  const { colorMode } = useColorMode()
  useEffect(() => {
    console.log('cliked')
  }, [pickerActive])

  return (
    <VStack>
      <Box marginY="5" marginX="2" borderColor="grey" shadow="2">
        <VStack>
          <Box
            marginTop="1"
            marginX="0.5"
            bg={
              !pickerActive && colorMode === 'light' ? '#e9e9e9' : 'primary.80'
            }
          >
            <Text
              paddingTop="6"
              fontSize="sm"
              margin="0"
              lineHeight="7"
              color={
                !pickerActive && colorMode === 'light'
                  ? 'text.100'
                  : 'textDarkMode.100'
              }
              paddingLeft="6"
            >
              {description}
            </Text>
          </Box>
          <Text
            paddingTop="6"
            fontSize="sm"
            fontWeight="600"
            margin="0"
            lineHeight="7"
            paddingLeft="6"
            color={
              !pickerActive && colorMode === 'light'
                ? 'text.100'
                : 'primary.100'
            }
          >
            Enter Date
          </Text>
          <Pressable onPress={() => setPickerActive(!pickerActive)}>
            <Input
              marginX="6"
              value={dayjs(value).format('DD/MM/YY')}
              showSoftInputOnFocus={false}
              onFocus={() => setPickerActive(true)}
              borderColor="#604696"
              isReadOnly={true}
              bg={colorMode === 'light' ? '#e9e9e9' : 'bgDarkMode.100'}
              borderWidth={pickerActive ? '0' : '1'}
              borderBottomWidth="1"
              borderBottomColor={pickerActive ? 'primary.100' : '#604696'}
            />
          </Pressable>
        </VStack>

        {pickerActive ? (
          <Box paddingY="2">
            <CalendarPicker
              startFromMonday={true}
              minDate={minimumDate}
              maxDate={maximumDate}
              weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
              restrictMonthNavigation={true}
              onDateChange={onChange}
              scrollable={false}
              date={value}
              selectedDayColor="#d659a0"
              dayTextColor={colorMode === 'light' ? '#3c3c3b' : 'white'}
              selectedDayTextColor="#FFFFFF"
              width={350}
              textStyle={
                colorMode === 'light'
                  ? {
                      fontFamily: 'Poppins-Medium',
                      color: '#3c3c3b',
                    }
                  : {
                      fontFamily: 'Poppins-Medium',
                      color: 'white',
                    }
              }
              nextTitle=">"
              previousTitle="<"
            />{' '}
          </Box>
        ) : (
          ''
        )}
      </Box>
    </VStack>
  )
}

export default DateTimeAlt
