import React from 'react'
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

const ProjectSummery = () => {

    const ProjectDetails = styled.View`
    margin: 21px 41px 0px 21px;
    border: ${props => `2px solid ${props.theme.colors.staBlack}`}
    padding: 17px 27px 11px 27px
    `


    const ProjectHeading = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    `

    const ProjectTitle = styled.Text`
    font-weight: 700;
    font-size: 18px;
    `
    const ProjectSubTitle = styled.Text`
    font-weight: 400;
    font-size: 16px;
    `

    const ProjectRole = styled.Text`
    font-weight: 600;
    font-size: 16px;
    margin-top: 9px;
    `

    const ProjectDescription = styled.Text`
    font-weight: 400;
    font-size: 10px;
    margin-top: 4px;
    `


    return (
        <ProjectDetails>
            <ProjectHeading>
                <ProjectTitle>Project Title</ProjectTitle>
                <FontAwesome name="heart" size={20}/>  
            </ProjectHeading>
            <ProjectSubTitle>STA internal</ProjectSubTitle>
            <ProjectRole>Lead Test Analyst</ProjectRole>
            <ProjectDescription>Lead Test Analyst The Lead Tester is a co-ordination and management role, so an understanding of and experience in a number of testing disciples is advantageous, rather than a specific depth in any one</ProjectDescription>
        </ProjectDetails>

    )
}

export default ProjectSummery
