import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import React, { FC } from 'react'

import styled from 'styled-components/native'

interface CalendarProps {
    markedColour: string;
}

const DateControls: FC<CalendarProps> = ({markedColour}: CalendarProps) => {
    return (
        <Calendar
            // Collection of dates that have to be marked. Default = {}
            markedDates={{
                '2022-05-16': { selected: true, marked: true, selectedColor: 'blue' },
                '2022-05-17': { marked: true },
                '2022-05-18': { marked: true, dotColor: markedColour, activeOpacity: 0 },
                '2022-05-19': { disabled: true, disableTouchEvent: true }
            }}
        />
    )
}

export default DateControls