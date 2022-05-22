import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import React, { FC } from 'react'

import styled from 'styled-components/native'

interface CalendarProps {
}

const DateControls: FC<CalendarProps> = ({

}) => {
    return (
        <Calendar
            // Collection of dates that have to be marked. Default = {}
            markedDates={{
                '2012-05-16': { selected: true, marked: true, selectedColor: 'blue' },
                '2012-05-17': { marked: true },
                '2012-05-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                '2012-05-19': { disabled: true, disableTouchEvent: true }
            }}
        />
    )
}

export default DateControls;