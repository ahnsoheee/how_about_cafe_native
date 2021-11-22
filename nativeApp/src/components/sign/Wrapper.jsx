import React from 'react';
import styled from 'styled-components/native';

const Wrapper = ({ children }) => {
    return (
        <StyledView>{children}</StyledView>
    )
}

const StyledView = styled.View`
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 10%;
`;


export default Wrapper;