import React from 'react'
import styled from 'styled-components/native';
import ProjectHeading from './ProjectHeading';
import ProjectSkills from './ProjectSkills';
import ProjectRequirements from './ProjectRequirements';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const ProjectDetails = styled.TouchableOpacity`
margin: 21px 41px 0px 21px;
border: ${props => `2px solid ${props.theme.colors.staBlack}`}
padding: 17px 27px 11px 27px
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

const ProjectSummery = () => {




    return (
        <ProjectDetails>
            <ProjectHeading />
            <ProjectSubTitle>STA internal</ProjectSubTitle>
            <ProjectRole>Lead Test Analyst</ProjectRole>
            <ProjectDescription>Lead Test Analyst The Lead Tester is a co-ordination and management role, so an understanding of and experience in a number of testing disciples is advantageous, rather than a specific depth in any one</ProjectDescription>
            <ProjectSkills />
            <ProjectRequirements  icon={<FontAwesome5 name="clock" size={16}/>} details={'6 Hours'} />
            <ProjectRequirements  icon={<AntDesign name="user" size={16} />} details={'1 Person Required'} />
            <ProjectRequirements  icon={<Feather name="users" size={16} />} details={'Suitable for buddying'} />
        </ProjectDetails>

    )
}

export default ProjectSummery
