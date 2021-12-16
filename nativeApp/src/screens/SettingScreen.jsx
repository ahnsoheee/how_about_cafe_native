import React from 'react';
import styled from 'styled-components/native';
import UserIcon from '../components/icon/UserIcon';
import { Text } from 'react-native';
import SettingList from '../components/common/SettingList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = ({ setAuth, user_name, navigation }) => {
    const manageMyReview = () => {
        // 내가 작성한 리뷰 로직 
    };

    const registerCafe = () => {
        // 카페 등록 로직
        navigation.navigate('Cafe', { navigation: navigation });
    };

    const logout = async () => {
        AsyncStorage.removeItem("token");
        setAuth(false);
    };

    const deleteUser = async () => {
        navigation.navigate('DeleteUser', { user_name: user_name });
    };

    return (
        <>
            <Header>
                <UserIcon />
                <UserId>&nbsp;&nbsp;{user_name}</UserId>
            </Header>
            <Text>{"\n"}</Text>
            <SettingList title="내가 작성한 리뷰" onPress={manageMyReview} />
            <SettingList title="카페 등록하기" onPress={registerCafe} navigation={navigation} />
            <SettingList title="로그아웃" onPress={logout} />
            <SettingList title="회원탈퇴" onPress={deleteUser} />
        </>
    );
};

const Header = styled.View`
    flex-direction: row;
    padding:  80px 30px 50px 30px;
    background-color: #FF8E26;
`;

const UserId = styled.Text`
    color: #ffffff;
    font-size: 30px;
    padding-top: 3px;
`;
export default SettingScreen;