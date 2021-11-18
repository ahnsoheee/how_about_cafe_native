import React, { useState } from 'react';
import Button from '../components/sign/Button';
import Input from '../components/sign/Input';
import Wrapper from '../components/common/Wrapper';
import { Text } from 'react-native';
import { ToastAndroid, Platform, AlertIOS, } from 'react-native';

const SignupPage = () => {
    const [id, setId] = useState('');
    const [pw1, setPw1] = useState('');
    const [pw2, setPw2] = useState('');

    const onChangeId = (text) => {
        setId(text);
    }

    const onChangePw1 = (text) => {
        setPw1(text);
    }

    const onChangePw2 = (text) => {
        setPw2(text);
    }

    const onPress = () => {
        if (!id.length || !pw1.length || !pw2.length) {
            if (Platform.OS === 'android') {
                ToastAndroid.show('아이디와 비밀번호를 모두 입력하세요', ToastAndroid.SHORT, ToastAndroid.CENTER)
            } else {
                AlertIOS.alert('아이디와 비밀번호를 모두 입력하세요');
            }
        } else {
            if (pw1 != pw2) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show('비밀번호가 일치하지 않습니다', ToastAndroid.SHORT, ToastAndroid.CENTER)
                } else {
                    AlertIOS.alert('비밀번호가 일치하지 않습니다');
                }
            } else {
                // 회원가입 로직 추가
            }
        }
    }
    return (

        <Wrapper>
            <Input type="text" placeholder="아이디" value={id} onChange={(text) => onChangeId(text)} />
            <Text>{"\n"}</Text>
            <Input type="password" placeholder="비밀번호" value={pw1} onChange={(text) => onChangePw1(text)} />
            <Text>{"\n"}</Text>
            <Input type="password" placeholder="비밀번호 확인" value={pw2} onChange={(text) => onChangePw2(text)} />
            <Text>{"\n"}</Text>
            <Button name="회원가입" onPress={onPress} />
        </Wrapper>
    )
}

export default SignupPage;