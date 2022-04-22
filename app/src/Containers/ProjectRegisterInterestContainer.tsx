import React from 'react'
import styled from 'styled-components/native'
import Theme from '@/Theme/OldTheme'
import { Project } from '@/Services/modules/projects/index'
import ProjectRegisterInterest from '@/Components/Project/ProjectRegisterInterest'

const SafeArea = styled.SafeAreaView`
  background: ${props => props.theme.colors.appBackground};
  color: ${props => props.theme.colors.staBlack};
  flex: 1;
`

const ProjectRegisterInterestContainer = (props: { route: { params: { project: Project } } }) => {
    const { project } = props.route.params;
    
    return (
        <SafeArea>
            <Theme>
                <ProjectRegisterInterest project={project} />
            </Theme>
        </SafeArea>
    )
}

export default ProjectRegisterInterestContainer