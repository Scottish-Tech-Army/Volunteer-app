import React from 'react'
import styled from 'styled-components/native'
import Theme from '@/Theme/OldTheme'
import { Project } from '@/Services/modules/projects/index'
import ProjectFullDetails from '@/Components/Project/ProjectFullDetails'

const SafeArea = styled.SafeAreaView`
  background: ${props => props.theme.colors.appBackground};
  color: ${props => props.theme.colors.staBlack};
  flex: 1;
`

const ProjectDetailContainer = (props: { route: { params: { item: Project } } }) => {
    const { item } = props.route.params;
    
    return (
        <SafeArea>
            <Theme>
                <ProjectFullDetails project={item} />
            </Theme>
        </SafeArea>
    )
}

export default ProjectDetailContainer