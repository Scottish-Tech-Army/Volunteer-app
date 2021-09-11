import React from 'react'
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';


const ProjectSkills = () => {

    const SkillsView = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 17px;
    
    `

    const SkillText = styled.Text`
    border: ${props => `2px solid ${props.theme.colors.staBlack}`};
    border-radius: 4px;
    margin-left: 8.5px;
    padding: 0px 1px 0px 1px;
    `


    return (
        <SkillsView>
            <Entypo name="tools" size={16} />
            <SkillText>Web Dev</SkillText>
            <SkillText>Python</SkillText>
            <SkillText>React</SkillText>
        </SkillsView>
    )
}

export default ProjectSkills
