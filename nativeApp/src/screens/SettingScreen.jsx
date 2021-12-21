import React from 'react';
import styled from 'styled-components/native';
import UserIcon from '../components/icon/UserIcon';
import { Text } from 'react-native';
import SettingList from '../components/common/SettingList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = ({ setAuth, user_name, user_id, setUserName, navigation }) => {
    const editUserInfo = () => {
        navigation.navigate('EditUserInfo', { user_name: user_name, setUserName: setUserName });
    };

    const manageMyReview = () => {
        navigation.navigate('MyReview', { user_id: user_id });
    };

    const registerCafe = () => {
        navigation.navigate('RegisterCafe');
    };

    const logout = async () => {
        AsyncStorage.removeItem("token");
        setAuth(false);
    };

    const deleteUser = async () => {
        navigation.navigate('DeleteUser', { user_id: user_id });
    };

    return (
        <>
            <Header>
                <UserIcon />
                <UserId>&nbsp;&nbsp;{user_name}</UserId>
            </Header>
            <Text>{"\n"}</Text>
            <SettingList title="회원정보 수정" onPress={editUserInfo} />
            <P />
            <SettingList title="리뷰 관리" onPress={manageMyReview} />
            <SettingList title="카페 등록" onPress={registerCafe} navigation={navigation} />
            <P />
            <SettingList title="로그아웃" onPress={logout} />
            <SettingList title="회원탈퇴" onPress={deleteUser} />
        </>
    );
};

const Header = styled.View`
    flex-direction: row;
    padding:  90px 30px 40px 30px;
    background-color: #FF8E26;
`;

const UserId = styled.Text`
    color: #ffffff;
    font-size: 30px;
    padding-top: 3px;
    font-weight: bold;
`;

const P = styled.Text`
    height: 7px;
`;

export default SettingScreen;