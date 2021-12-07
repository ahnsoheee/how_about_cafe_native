import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/common/Button';

const RegisterCafeScreen = ({ navigation }) => {

    const [name, onChangeName] = useState('');
    const [addr, onChangeAddr] = useState('');

    const registerCafe = () => {
        // 카페 등록 로직

        navigation.goBack();
    };

    return (
        <Wrapper>
            <Input placeholder="이름을 입력해주세요." onChangeText={onChangeName} value={name} editable maxLength={100} multiline={true} />
            <Input placeholder="주소를 입력해주세요." onChangeText={onChangeAddr} value={addr} editable maxLength={100} multiline={true} />
            <Button name="등록하기" onPress={registerCafe} />
        </Wrapper>
    );
};

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 30px 20px;
    justify-content: center;
`;

const Input = styled.TextInput`
    width: 100%;
    height: 20%;
    font-size: 18px;
    padding: 10px;
    margin: 10px 0;
    text-align-vertical: top;
    background-color: #ffffff;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 10px;
    elevation: 3;

`;
export default RegisterCafeScreen;