import React from 'react';
import styled from 'styled-components/native';

const Button = ({ name, onPress }) => {
    return <ButtonWrapper onPress={onPress}>{name}</ButtonWrapper>;
};

const ButtonWrapper = styled.Text`
  width: 100%;
  background-color: #ff8e26;
  height: 50px;
  color: #ffffff;
  font-size: 17px;
  margin-top: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 25px;
  overflow: hidden;
  font-weight: bold;
  elevation: 3;
`;

export default Button;
