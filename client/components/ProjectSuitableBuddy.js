import React from 'react'
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';


const ProjectSuitableBuddy = () => {

    const BuddyView = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 7px;
    `
    
    const BuddyText = styled.Text`
    margin-left: 13px;

    `


    return (
        <BuddyView>
            <Feather name="users" size={16} />
            <BuddyText>Suitable for buddying</BuddyText>
        </BuddyView>
    )
}

export default ProjectSuitableBuddy
