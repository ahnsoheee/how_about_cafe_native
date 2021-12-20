import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/sign/Input';
import Wrapper from '../components/sign/Wrapper';
import { Text } from 'react-native';
import { ToastAndroid, Platform } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { API } from "../api/api";

const SignupPage = ({ navigation }) => {
    const [id, setId] = useState('');
    const [pw1, setPw1] = useState('');
    const [pw2, setPw2] = useState('');
    const [name, setName] = useState('');

    const onChangeId = (text) => {
        setId(text);
    };

    const onChangePw1 = (text) => {
        setPw1(text);
    };

    const onChangePw2 = (text) => {
        setPw2(text);
    };

    const onChangeName = (text) => {
        setName(text);
    };

    const onPress = async () => {
        if (!id.length || !pw1.length || !pw2.length || !name.length) {
            if (Platform.OS === 'android') {
                ToastAndroid.show('아이디와 비밀번호, 닉네임을 모두 입력하세요', ToastAndroid.SHORT, ToastAndroid.CENTER);
            } else {
                SimpleToast.show('아이디와 비밀번호, 닉네임을 모두 입력하세요', SimpleToast.SHORT);
            }
        } else {
            if (pw1 != pw2) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show('비밀번호가 일치하지 않습니다', ToastAndroid.SHORT, ToastAndroid.CENTER);
                } else {
                    SimpleToast.show('비밀번호가 일치하지 않습니다', SimpleToast.SHORT);
                }
            } else {
                res = await API.post("/user/signup", {
                    "user_id": id,
                    "pw": pw1,
                    "user_name": name
                });

                if (Platform.OS === 'android') {
                    ToastAndroid.show(result.msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                } else {
                    SimpleToast.show(res.result, SimpleToast.SHORT);
                }

                if (res.status) navigation.navigate('Main');
            }
        }
    };
    return (

        <Wrapper>
            <Input type="text" placeholder="아이디를 입력해주세요." value={id} onChange={(text) => onChangeId(text)} />
            <Text>{"\n"}</Text>
            <Input type="password" placeholder="비밀번호를 입력해주세요." value={pw1} onChange={(text) => onChangePw1(text)} />
            <Text>{"\n"}</Text>
            <Input type="password" placeholder="비밀번호 확인" value={pw2} onChange={(text) => onChangePw2(text)} />
            <Text>{"\n"}</Text>
            <Input type="text" placeholder="닉네임을 입력해주세요." value={name} onChange={(text) => onChangeName(text)} />
            <Text>{"\n"}</Text>
            <Button name="회원가입" onPress={onPress} />
        </Wrapper>
    );
};

export default SignupPage;