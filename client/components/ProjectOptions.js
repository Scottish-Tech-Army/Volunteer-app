import React from 'react'
import styled from 'styled-components/native';

const ProjectOptionsView = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
margin: 23px 10px
`

const ProjectOptionsText = styled.Text`
    font-size: 18px
`

const ProjectOptionsTouch = styled.TouchableOpacity``



const ProjectOptions = () => {

    return (
        <ProjectOptionsView>
            <ProjectOptionsTouch>
                <ProjectOptionsText>All projects</ProjectOptionsText>
            </ProjectOptionsTouch>

            <ProjectOptionsTouch>
                <ProjectOptionsText>Saved Projects</ProjectOptionsText>
            </ProjectOptionsTouch>
            <ProjectOptionsTouch>
                <ProjectOptionsText>My Projects</ProjectOptionsText>
            </ProjectOptionsTouch>

            
            
        </ProjectOptionsView>
    )
}

export default ProjectOptions
