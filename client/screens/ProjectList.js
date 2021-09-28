import React from 'react'
import styled from 'styled-components/native';
import TopOfApp from '../components/TopOfApp';
import ProjectOptions from '../components/ProjectOptions'
import ProjectSearch from '../components/ProjectSearch'
import ProjectReturnedList from '../components/ProjectReturnedList';


const SafeArea = styled.SafeAreaView`
    background: ${props => props.theme.colors.appBackground};
    color: ${props => props.theme.colors.staBlack};
`



const HorizontalLine = styled.View`
    border: ${props => `1px solid ${props.theme.colors.staBlack}`};
    margin: 0px 75px 10px 75px
    `


const ProjectList = ({data}) => {
    

    return (
        <SafeArea>
            <TopOfApp />
            <ProjectSearch />
            <ProjectOptions />
            <HorizontalLine />
            <ProjectReturnedList data = {data}/>
        </SafeArea>
    )
}

export default ProjectList
