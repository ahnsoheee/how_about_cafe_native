import React, { useState } from 'react';
import styled from 'styled-components/native';
import Button from '../components/common/Button';
import SimpleToast from 'react-native-simple-toast';
import Toast from 'react-native-simple-toast';
import { API } from '../api/api';

const RegisterCafeScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [selectedAddr, setSelectAddr] = useState('검색하기');
    const [addr_road, setAddr_road] = useState('');
    const [addr_jibun, setAddr_jibun] = useState('');
    const [extraAddr, setExtraAddr] = useState('');
    const [postcode, setPostcode] = useState('');

    const searchAddr = () => {
        navigation.navigate('Post', { setSelectAddr: setSelectAddr, setAddr_road: setAddr_road, setAddr_jibun: setAddr_jibun, setPostcode: setPostcode });
    };

    const registerCafe = async () => {
        // 카페 등록 로직

        if (!name.length || !postcode.length) {
            SimpleToast.show("이름과 주소를 모두 입력해주세요.", SimpleToast.SHORT);
        } else {
            const res = await API.post("/cafe", {
                "cafe_name": name.trim(),
                "addr_road": addr_road.trim() + " " + extraAddr.trim(),
                "addr_jibun": addr_jibun.trim() + " " + extraAddr.trim()
            });
            SimpleToast.show(res.message, SimpleToast.SHORT);
            if (res.status == 200) {
                navigation.goBack();
            }
        }
    };

    return (
        <>
            <Wrapper>
                <Title>카페 이름</Title>
                <Input placeholder="이름을 입력해주세요." onChangeText={setName} value={name} editable maxLength={100} multiline={true} />
                <Title>주소</Title>
                <AddrButton onPress={searchAddr}>{selectedAddr}</AddrButton>
                <Title>상세 주소</Title>
                <Input placeholder="상세 주소를 입력해주세요." onChangeText={setExtraAddr} value={extraAddr} />
                <Button name="등록하기" onPress={registerCafe} />
            </Wrapper>

        </>
    );
};

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 30px 20px;
`;

const Title = styled.Text`
    padding-left: 10px;
    font-size: 17px;
`;

const Input = styled.TextInput`
    width: 100%;
    height: 40px;
    font-size: 18px;
    padding: 10px;
    margin: 10px 0;
    background-color: #F0F0F0;
    border-radius: 10px;
    elevation: 3;
`;

const AddrButton = styled.Text`
    width: 100%;
    height: 40px;
    font-size: 18px;
    padding: 10px;
    margin: 10px 0;
    background-color: #F0F0F0;
    border-radius: 10px;
    overflow: hidden;
    elevation: 3;
`;

export default RegisterCafeScreen;;