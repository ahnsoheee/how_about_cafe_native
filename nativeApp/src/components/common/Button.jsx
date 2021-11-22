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
    border-radius: 10px;
    font-weight: bold;
`

export default Button;