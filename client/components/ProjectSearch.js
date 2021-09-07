import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';


const ProjectSearch = () => {

    const SearchView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 54px;
    `


    return (
        <SearchView>
            <FontAwesome name="search" size={38}/>
        </SearchView>
         

    )
}

export default ProjectSearch
