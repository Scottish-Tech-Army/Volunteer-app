import React from 'react'
import Logo from './StaLogo'
//import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';

const TopView = styled.View`
color: #3c3c3b;
display: flex;
flex-direction: row;
justify-content: space-between;
`

const BurgerView = styled.View`
    background: #E5E5E5;
    margin-right: 16px;
    margin-top: 10px;
    
`

const TopOfApp = () => {

    return (
        <TopView>
            <Logo />
            <BurgerView>

            </BurgerView>
            
        </TopView>
    )
}

export default TopOfApp;

{/* <FontAwesome name="bars" size={32}/>   */}