import React from 'react'
import styled from 'styled-components/native';
import ProjectSummery from './ProjectSummery';

const ScrollableListWrapper = styled.ScrollView`
    height: 100%
    `

const Text = styled.Text`
    color: ${props => props.theme.colors.staBlack};
    padding: 30px 0px
    
`

            


const ProjectReturnedList = () => {
    return (
        <ScrollableListWrapper>

            <ProjectSummery />
          
        </ScrollableListWrapper>

    )
}

export default ProjectReturnedList
