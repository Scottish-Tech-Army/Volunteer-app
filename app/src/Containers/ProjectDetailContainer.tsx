import React, { FC, useEffect } from 'react'
import styled from 'styled-components/native'
import Theme from '@/Theme/OldTheme'
import { Project } from '@/Services/modules/projects/index'
import ProjectFullDetails from '@/Components/Project/ProjectFullDetails'

interface ProjectProps {
    project: Project
}

const SafeArea = styled.SafeAreaView`
  background: ${props => props.theme.colors.appBackground};
  color: ${props => props.theme.colors.staBlack};
  flex: 1;
`

const ProjectDetails: FC<ProjectProps> = ({ project }) => {
    return (
        <SafeArea>
            <ProjectFullDetails project={project} />
        </SafeArea>
    )
}

// NOTE: for testing purposes project data added here  
const project = {
    "key": "PKAVS",
    "name": "project-website-pkavs",
    "type": "Team-managed software",
    "client": "PKAVS",
    "role": "QA Tester",
    "description": "Blah blah",
    "skills": ["Acceptance Testing"],
    "hours": "5-10 hours per week",
    "required": "One person",
    "buddying": false
}

const ProjectDetailContainer = () => {
    
     return (
        <Theme>
            <ProjectDetails project={project} />
        </Theme>
    )
}

export default ProjectDetailContainer