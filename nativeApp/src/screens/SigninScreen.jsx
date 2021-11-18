import React, { useState } from 'react';
import Button from '../components/sign/Button'
import Input from '../components/sign/Input';
import Wrapper from '../components/common/Wrapper';
import { Text } from 'react-native';
import { ToastAndroid, Platform, AlertIOS, } from 'react-native';

const SigninScreen = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const onChangeId = (text) => {
        setId(text);
    }

    const onChangePw = (text) => {
        setPw(text);
    }

    const onPress = () => {
        if (!id.length || !pw.length) {
            if (Platform.OS === 'android') {
                ToastAndroid.show('아이디와 비밀번호를 모두 입력하세요', ToastAndroid.SHORT, ToastAndroid.CENTER)
            } else {
                AlertIOS.alert('아이디와 비밀번호를 모두 입력하세요');
            }
        } else {

            // 로그인 로직 추가
        }
    }
    return (

        <Wrapper>
            <Input type="text" placeholder="아이디" value={id} onChange={(text) => onChangeId(text)} />
            <Text>{"\n"}</Text>
            <Input type="password" placeholder="비밀번호" value={pw} onChange={(text) => onChangePw(text)} />
            <Text>{"\n"}</Text>
            <Button name="로그인" onPress={onPress} />
        </Wrapper>
    )
}

export default SigninScreen;