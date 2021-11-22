import React from 'react';
import styled from 'styled-components/native';

const Button = ({ name, onPress }) => {
    return (
        <ButtonWrapper onPress={onPress}>{name}</ButtonWrapper>
    )
}

const ButtonWrapper = styled.Text`
    background-color: #FF8E26;
    width: 100%;
    height: 50px;
    color: #ffffff;
    font-size: 15px;
    margin-top: 20px;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 15px;
    font-weight: bold;
    shadow-color: #000000;
    shadow-offset: { width: 0; height: 1 };
    shadow-opacity: 0.8;
    shadow-radius: 10px;
    elevation: 3;
`

export default Button;