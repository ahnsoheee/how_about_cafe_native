import React, { useState } from 'react';
import Info from '../components/common/Info';
import styled from 'styled-components/native'
import { Searchbar } from 'react-native-paper';
import { ToastAndroid, Platform, AlertIOS, } from 'react-native';

const HomeScreen = ({ search, setSearch, searchValue, setSearchValue }) => {

    const onPress = () => {
        // 상세 정보 로직
    }

    const onChangeText = (value) => {
        setSearchValue(value);
    }

    const onSearch = () => {
        if (!searchValue) {
            if (Platform.OS === 'android') {
                ToastAndroid.show('검색어를 입력해주세요', ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
            else {
                AlertIOS.alert('검색어를 입력해주세요');
            }
        } else {
            // 검색 로직
            setSearch(true);
            ToastAndroid.show(searchValue, ToastAndroid.SHORT, ToastAndroid.CENTER)

        }
    };

    return (
        <>
            <Header search={search}>
                <Search placeholder='검색' value={searchValue} onChangeText={onChangeText} onIconPress={onSearch} />
                {search ? <></> : <Title>카페어때</Title>}
            </Header>
            <Content>
                {/* top4-list */}
                <Info name="하이엔드라이" star="4.93" addr="서울 성동구 광나루로 302" review="37" onPress={onPress} />
                <Info name="하이엔드라이" star="4.93" addr="서울 성동구 광나루로 302" review="37" onPress={onPress} />
                <Info name="하이엔드라이" star="4.93" addr="서울 성동구 광나루로 302" review="37" onPress={onPress} />
                <Info name="하이엔드라이" star="4.93" addr="서울 성동구 광나루로 302" review="37" onPress={onPress} />
            </Content>
        </>
    )
}

const Search = styled(Searchbar)`
    width: 90%;
    margin: 10px;
`;

const Title = styled.Text`
    width: 87%;
    font-weight: bold;
    font-size: 24px;
    color: #ffffff;
    padding-top: 10px;
    padding-bottom: 20px;
`;

const Header = styled.View`
    align-items: center;
    padding-top: 15px;
    background-color: ${(props) => (props.search ? "#FFFFFF" : "#FF8E26")}; 
`;

const Content = styled.View`
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 3%;
    background-color: #ffffff;
`;
export default HomeScreen