import { Calendar } from 'react-native-calendars'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native';

interface DateControlsProps {
    markedColour?: string;
    markedDates?: string;
}

const CalendarView = styled.View`
    display: flex;
    flex-direction: column;
`

const DateControls: FC<DateControlsProps> = (
    { markedColour }: DateControlsProps,
    { markedDates }: DateControlsProps,
) => {
    return (
        <CalendarView>
            <Calendar
                // Weeks start on Monday, no matter what Americans think
                firstDay={1}
                // Collection of dates that have to be marked. Default = {}
                markingType={'period'}
                markedDates={{
                    '2022-05-31': { textColor: 'blue' },
                    '2022-05-19': { startingDay: true, color: 'blue', textColor: 'white' },
                    '2022-05-20': { selected: true, endingDay: true, color: 'blue', textColor: 'white' },
                    '2022-05-04': { disabled: true, startingDay: true, color: 'green', endingDay: true }
                }}
                onDayPress={
                    day => {
                        console.log('selected day', day);
                    }
                }
            />
        </CalendarView>
    )
}

export default DateControls