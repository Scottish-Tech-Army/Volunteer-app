/**
 * @file DatePicker.
 */

import React, { FC, useState } from 'react'
import CalendarPicker from 'react-native-calendar-picker'
import { Pressable, Dimensions } from 'react-native'
import { VStack, Box, Text, Input, useColorMode, Icon } from 'native-base'
import dayjs from 'dayjs'
import StaTheme from '../../Theme/StaTheme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface DatePickerProps {
  description: string
  maximumDate?: Date
  minimumDate?: Date
  onChange: (date: Date) => void
  value: Date
}

const DatePicker: FC<DatePickerProps> = ({
  description,
  maximumDate,
  minimumDate,
  onChange,
  value,
}) => {
  const [pickerActive, setPickerActive] = useState(false)
  const [selectedStartDate, setSelectedStartDate] = useState('')
  const [todaySelected, setTodaySelected] = useState(false)
  const { colorMode } = useColorMode()
  const { width } = Dimensions.get('window')

  const handleChange = value => {
    console.log(value)
    onChange(value)
    setSelectedStartDate(value)
    setPickerActive(false)
    if (value.format('DD/MM/YY') === dayjs().format('DD/MM/YY')) {
      setTodaySelected(true)
    } else {
      setTodaySelected(false)
    }
  }

  const customDatesStylesCallback = date => {
    if (date.format('DD/MM/YY') === dayjs().format('DD/MM/YY')) {
      if (colorMode === 'light') {
        return {
          style: {
            backgroundColor: 'bg.100',
            borderWidth: 1,
          },
        }
      } else {
        return {
          style: {
            borderColor: 'white',
            backgroundColor: 'bgDarkMode.100',
            borderWidth: 1,
          },
        }
      }
    }
  }

  return (
    <VStack>
      <Box marginTop="5" marginBottom="10" borderColor="border.100" shadow="2">
        <VStack>
          <Box
            marginTop="1"
            marginX="0.5"
            shadow="1"
            bg={
              !pickerActive && colorMode === 'light'
                ? 'lightGrey.100'
                : 'primary.80'
            }
          >
            <Text
              paddingTop="7"
              fontSize="xs"
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
            paddingTop="8"
            fontSize="sm"
            fontWeight="600"
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
              accessibilityLabel="picker for available from date"
              borderColor="inputBorder.100"
              isReadOnly={true}
              size="sm"
              borderWidth={pickerActive ? '0' : '1'}
              borderBottomWidth="1"
              borderBottomColor={
                pickerActive ? 'primary.100' : 'inputBorder.100'
              }
              _light={{ bg: 'lighterGrey.100' }}
              _dark={{ bg: 'bgDarkMode.100' }}
            />
          </Pressable>
        </VStack>

        {pickerActive ? (
          <Box paddingTop="2">
            <CalendarPicker
              startFromMonday={true}
              minDate={minimumDate}
              maxDate={maximumDate}
              weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
              restrictMonthNavigation={true}
              onDateChange={handleChange}
              date={value}
              todayTextStyle={
                colorMode === 'light' && !todaySelected
                  ? {
                      fontFamily: StaTheme.fontConfig.Poppins['500'].normal,
                      color: StaTheme.colors.darkGrey['100'],
                    }
                  : {
                      fontFamily: StaTheme.fontConfig.Poppins['500'].normal,
                      color: 'white',
                    }
              }
              selectedStartDate={selectedStartDate ? selectedStartDate : null}
              selectedDayColor={StaTheme.colors.primary['80']}
              dayTextColor={
                colorMode === 'light'
                  ? StaTheme.colors.darkGrey['100']
                  : 'white'
              }
              selectedDayTextColor="white"
              width={width - 22}
              textStyle={
                colorMode === 'light'
                  ? {
                      fontFamily: StaTheme.fontConfig.Poppins['500'].normal,
                      color: StaTheme.colors.darkGrey['100'],
                    }
                  : {
                      fontFamily: StaTheme.fontConfig.Poppins['500'].normal,
                      color: 'white',
                    }
              }
              customDatesStyles={customDatesStylesCallback}
              nextComponent={
                <Icon
                  as={MaterialIcons}
                  color="primary.100"
                  name="arrow-forward-ios"
                  size="sm"
                />
              }
              previousComponent={
                <Icon
                  as={MaterialIcons}
                  color="primary.100"
                  name="arrow-back-ios"
                  size="sm"
                />
              }
            />{' '}
          </Box>
        ) : (
          <Box p="2" />
        )}
      </Box>
    </VStack>
  )
}

export default DatePicker
