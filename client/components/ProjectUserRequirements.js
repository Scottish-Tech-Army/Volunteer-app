import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';


const ProjectUserRequirements = () => {

    const UserView = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 7px;
    `

    const UserText = styled.Text`
    margin-left: 13px;
    `

    return (
        <UserView>
            <AntDesign name="user" size={16} />
            <UserText>1 Person Required</UserText>
        </UserView>
    )
}

export default ProjectUserRequirements
