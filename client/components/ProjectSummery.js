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
border: ${props => `2px solid ${props.theme.colors.staBlack}`};
padding: 17px 27px 11px 27px;
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

const ProjectSummery = ({data}) => {

    // const data = [{
    //     key: "SVA",
    //     name: "STA-volunteer App",
    //     type: "Team-managed software",
    //     client: "STA - internal",
    //     role: "Lead developer",
    //     description: "Blah blah",
    //     skills: ["React Native", "Node.js"],
    //     hours: "5-10 hours per week",
    //     required: "One person",
    //     buddying: true
    // },

    // {
    //     key: "PKAVS",
    //     name: "project-website-pkavs",
    //     type: "Team-managed software",
    //     client: "PKAVS",
    //     role: "QA Tester",
    //     description: "Blah blah",
    //     skills: ["Acceptance Testing"],
    //     hours: "5-10 hours per week",
    //     required: "One person",
    //     buddying: false
    // }];

    const projectList = data.map((project, index) => {
        return (
            <ProjectDetails key = {index}>
                <ProjectHeading title = {project.name} />
                <ProjectSubTitle>{project.client}</ProjectSubTitle>
                <ProjectRole>{project.role}</ProjectRole>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectSkills skills = {project.skills}/>           
                <ProjectRequirements icon={<FontAwesome5 name="clock" size={16}/>} details={project.hours} />
                <ProjectRequirements icon={<AntDesign name="user" size={16} />} details={`${project.required} required`} />
                <ProjectRequirements icon={<Feather name="users" size={16} />} details={ project.buddying ? 'Suitable for buddying' : 'Not suitable for buddying'} />
            </ProjectDetails>

        );
    })

    return (
        <>
        {projectList}
        </>
    )
}

export default ProjectSummery;
