import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native'
import { Searchbar } from 'react-native-paper';
import { ToastAndroid, Platform, AlertIOS, } from 'react-native';
import List from '../components/common/List';

const HomeScreen = ({ search, setSearch, searchValue, setSearchValue }) => {

    const [TopList, setTopList] = useState([])
    const [SearchedList, setSearchedList] = useState([])

    useEffect(() => {
        // Top 4 가져오는 로직
        setTopList(infoList);
    }, [])

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
            setSearch(true);
            // 검색 로직
            setSearchedList(list)
        }
    };

    return (
        <>
            <Header search={search}>
                <Search placeholder='검색' value={searchValue} onChangeText={onChangeText} onIconPress={onSearch} />
                {search ? <></> : <Title>카페어때</Title>}
            </Header>
            {search ?
                <Content>
                    {/* 검색 목록 */}
                    <List infos={SearchedList} />
                </Content>
                :
                <Content>
                    {/* top4-list */}
                    <List infos={TopList} />
                </Content>
            }
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
    flex-grow: 1;
    align-items: center;
    width: 100%;
    padding-top: 3%;
    background-color: #ffffff;
`;
export default HomeScreen