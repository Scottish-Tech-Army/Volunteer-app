import React from 'react'
import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';


const ProjectTimeRequired = () => {

    const TimeView = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 7px;
    `

    const TimeText = styled.Text`
    margin-left: 13px;

    `

    return (
        <TimeView>
            <FontAwesome5 name="clock" size={16}/>
            <TimeText>6 Hours</TimeText>
        </TimeView>
    )
}

export default ProjectTimeRequired
