import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const InitScreen = ({ navigation }) => {

    const onPressSignin = () => {
        navigation.navigate('Signin');
    };

    const onPressSignup = () => {
        navigation.navigate('Signup');
    };
    return (
        <StyledView>
            <Title>카페어때</Title>
            <Text>{"\n"}</Text>
            <StyledButton onPress={onPressSignin}>로그인</StyledButton>
            <Text>{"\n"}</Text>
            <StyledButton onPress={onPressSignup}>회원가입</StyledButton>
        </StyledView>

    );
};

const StyledView = styled.View`
    background-color: #FF8E26;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 10%;
`;

const Title = styled.Text`
    font-size: 50px;
    color: #ffffff;    
    padding-bottom: 23%;
`;

const StyledButton = styled.Text`
    background-color: #ffffff;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #FF8E26;
    font-size: 15px;
    margin-top: 20px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-weight: bold;
`;
export default InitScreen;