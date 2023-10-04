/**
 * @file DatePicker.
 */

import React, { FC, useState } from 'react'
import CalendarPicker from 'react-native-calendar-picker'
import { Dimensions } from 'react-native'
import {
  VStack,
  Box,
  Text,
  Input,
  useColorMode,
  Icon,
  Pressable,
  View,
} from 'native-base'
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
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [todaySelected, setTodaySelected] = useState(false)
  const { colorMode } = useColorMode()
  const { width } = Dimensions.get('window')

  const toggleShowDatePicker = () => {
    setPickerActive(!pickerActive)
  }

  const handleChange = (value: Date) => {
    onChange(value)
    setSelectedStartDate(value)
    toggleShowDatePicker()
    //set selected state to use on line 139 to override today text color default
    if (dayjs(value).isSame(dayjs(), 'day')) {
      setTodaySelected(true)
    } else {
      setTodaySelected(false)
    }
  }

  const todayTextStyle = {
    color:
      colorMode === 'light' && !todaySelected
        ? StaTheme.colors.darkGrey['100']
        : 'white',
  }
  const textStyle = {
    color: colorMode === 'light' ? StaTheme.colors.darkGrey['100'] : 'white',
  }

  //override calendarpicker todayStyle default to set border and bg on today's date
  const customDatesStylesCallback = (date: Date) => {
    if (dayjs(date).isSame(dayjs(), 'day')) {
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
    <VStack marginTop="5" marginBottom="10">
      <VStack>
        <Box
          paddingX="6"
          paddingY="2"
          bgColor={
            !pickerActive && colorMode === 'light'
              ? 'secondaryGrey.60'
              : 'primary.80'
          }
          shadow="4"
        >
          <Text fontSize="xs">{description}</Text>
        </Box>

        <VStack
          bgColor="white"
          _dark={{ bgColor: 'bgDarkMode.100' }}
          shadow="4"
          paddingX="6"
          paddingTop="6"
          paddingBottom="2"
          space="2"
        >
          <Text
            fontSize="sm"
            fontFamily="primarySemiBold"
            _dark={{ color: 'primary.100' }}
            _light={
              pickerActive ? { color: 'primary.100' } : { color: 'text.100' }
            }
          >
            Enter Date
          </Text>
          <Pressable onPress={toggleShowDatePicker}>
            <View
              pointerEvents="none"
              borderBottomWidth="1"
              borderBottomColor="primary.100"
            >
              <Input
                value={dayjs(value).format('DD/MM/YY')}
                accessibilityLabel="picker for date"
                borderColor={
                  pickerActive ? 'secondaryGrey.80' : 'inputBorder.100'
                }
                _dark={{ backgroundColor: 'bgDarkMode.100' }}
                backgroundColor={pickerActive ? 'secondaryGrey.80' : 'white'}
                isReadOnly={true}
                size="sm"
              />
            </View>
          </Pressable>

          {pickerActive && (
            <Box paddingTop="2">
              <CalendarPicker
                startFromMonday
                minDate={minimumDate}
                maxDate={maximumDate}
                weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
                restrictMonthNavigation
                onDateChange={handleChange}
                date={value}
                fontFamily="primaryMedium"
                todayTextStyle={todayTextStyle}
                selectedStartDate={selectedStartDate ? selectedStartDate : null}
                selectedDayColor={StaTheme.colors.primary['80']}
                dayTextColor={
                  colorMode === 'light'
                    ? StaTheme.colors.darkGrey['100']
                    : 'white'
                }
                selectedDayTextColor="white"
                width={width - 22}
                textStyle={textStyle}
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
              />
            </Box>
          )}
        </VStack>
      </VStack>
    </VStack>
  )
}

export default DatePicker
