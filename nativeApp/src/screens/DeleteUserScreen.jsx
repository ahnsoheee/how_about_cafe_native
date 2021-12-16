import React from 'react';
import styled from 'styled-components/native';
import { API } from "../api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteUserScreen = ({ setAuth, navigation, route }) => {
    const deleteUser = async () => {
        const res = await API.get(`/user/delete?user_name=${route.params.user_name}`);
        if (res.status) {
            AsyncStorage.removeItem("token");
            navigation.navigate('Main');
        }
        else Toast.show(res.result, Toast.SHORT);
    };

    const cancel = () => {
        navigation.navigate('Main');
    };

    return (
        <Wrapper>
            <TextWrapper>
                정말로 탈퇴하시겠어요?
            </TextWrapper>
            <ButtonWrapper>
                <StyledButton onPress={cancel}>탈퇴 안 할래요</StyledButton>
                <StyledButton onPress={deleteUser}>탈퇴할래요</StyledButton>
            </ButtonWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #ffffff;    
`;

const TextWrapper = styled.Text`
    width: 100%;
    padding: 50% 0;
    text-align: center;
    color: red;
    font-size: 30px;
    font-weight: bold;
`;

const ButtonWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
`;

const StyledButton = styled.Text`
    width: 40%;
    height: 45px;
    margin: 10px;
    padding-top: 13px;
    background-color: #000000;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    border-radius: 22px;
    font-size: 17px;
    align-items: center;
    overflow: hidden;
`;

export default DeleteUserScreen;