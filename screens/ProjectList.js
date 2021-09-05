import React from 'react'
import styled from 'styled-components/native';
import StaLogo from '../images/RoundAvatar.png'


const SafeArea = styled.SafeAreaView`
background: ${props => props.theme.colors.appBackground};
`

const Text = styled.Text`
    color: ${props => props.theme.colors.staBlack};
    
`

const StaLogoImage = styled.Image`
 width: 81px;
 height: 81px;
 margin-left: 16px;
 margin-top: 10px;
`

const ProjectList = () => {
    return (
        <SafeArea>
            <StaLogoImage source={StaLogo}  />

            <Text>Testing Screen</Text>
        </SafeArea>
    )
}

export default ProjectList
