import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/sign/Input';
import Wrapper from '../components/sign/Wrapper';
import { Text } from 'react-native';
import { ToastAndroid, Platform } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { API } from "../api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SigninScreen = ({ navigation }) => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const onChangeId = (text) => {
        setId(text);
    };

    const onChangePw = (text) => {
        setPw(text);
    };

    const storeData = async (key, value) => {
        await AsyncStorage.setItem(key, value);
    };

    const onPress = async () => {
        if (!id.length || !pw.length) {
            if (Platform.OS === 'android') {
                ToastAndroid.show('아이디와 비밀번호를 모두 입력하세요', ToastAndroid.SHORT, ToastAndroid.CENTER);
            } else {
                SimpleToast.show('아이디와 비밀번호를 모두 입력하세요', SimpleToast.SHORT);
            }
        } else {
            const res = await API.post('/user/signin', {
                'user_id': id,
                'pw': pw
            });

            if (res.status > 200) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(res.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                } else {
                    SimpleToast.show(res.message, SimpleToast.SHORT);
                }
            } else {
                storeData('token', res.message);
                navigation.navigate('Main');
            }
        }
    };

    return (
        <Wrapper>
            <Input type="text" placeholder="아이디" value={id} onChange={(text) => onChangeId(text)} />
            <Text>{"\n"}</Text>
            <Input type="password" placeholder="비밀번호" value={pw} onChange={(text) => onChangePw(text)} />
            <Text>{"\n"}</Text>
            <Button name="로그인" onPress={onPress} />
        </Wrapper>
    );
};

export default SigninScreen;