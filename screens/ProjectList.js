import React from 'react'
import styled from 'styled-components/native';
import TopOfApp from '../components/TopOfApp';
import ProjectOptions from '../components/ProjectOptions'
import ProjectSearch from '../components/ProjectSearch'


const SafeArea = styled.SafeAreaView`
    background: ${props => props.theme.colors.appBackground};
    color: ${props => props.theme.colors.staBlack};
`

const Text = styled.Text`
    color: ${props => props.theme.colors.staBlack};
    
`


const ProjectList = () => {
    return (
        <SafeArea>
            <TopOfApp />
            <ProjectSearch />
            <ProjectOptions />
            
            <Text>Testing Screen</Text>
        </SafeArea>
    )
}

export default ProjectList
