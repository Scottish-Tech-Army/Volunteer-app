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
                // Weeks start on Monday
                firstDay={1}
                // Collection of dates that have to be marked. Default = {}
                markedDates={{
                    '2022-05-18': { marked: true, dotColor: markedColour }
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