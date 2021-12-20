import React from 'react';
import { useState } from 'react';
import styled from 'styled-components/native';
import SimpleToast from 'react-native-simple-toast';
import { API } from '../api/api';

const EditUserInfo = ({ route }) => {
    const user_name = route.params.user_name;
    const setUserName = route.params.setUserName;
    const [name, onChangeName] = useState(user_name);

    const editUserName = async () => {
        if (name == user_name) {
            SimpleToast.show("현재 닉네임입니다.", SimpleToast.SHORT);
        } else if (name.length < 1 || name.length > 20) {
            SimpleToast.show("닉네임은 최소 1, 최대 20 글자로 작성해주세요.");
        } else {
            const res = await API.patch(`/user/${user_name}/edit/name`, name);
            if (res.status) setUserName(name);
            SimpleToast.show(res.result, SimpleToast.SHORT);
        }
    };

    return (
        <Wrapper>
            <Title>닉네임</Title>
            <Info>
                <Input placeholder={user_name} value={name} onChangeText={onChangeName} />
                <Button onPress={editUserName}>변경</Button>
            </Info>
        </Wrapper>
    );
};

const Wrapper = styled.View`
    width: 100%;
    height:100%;
    padding: 10% 5%;
    background-color: #ffffff;
`;

const Title = styled.Text`
    padding-left: 10px;
    font-size: 15px;
`;

const Info = styled.View`
    display: flex;
    flex-direction: row;
    padding: 7px;
`;

const Input = styled.TextInput`
    width: 70%;
    height: 50px;
    padding: 0 10px;
    background-color: #F0F0F0;
    border-radius: 10px;
    margin-right: 10px;
    font-size: 16px;
`;

const Button = styled.Text`
    width: 30%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
    background-color: #FF8E26;
    border-radius: 25px;
    overflow: hidden;
`;

export default EditUserInfo;