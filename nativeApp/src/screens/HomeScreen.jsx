import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import ModalSelector from 'react-native-modal-selector';
import { Searchbar } from 'react-native-paper';
import { ToastAndroid, Platform, AlertIOS, } from 'react-native';
import InfoList from '../components/common/InfoList';

const HomeScreen = ({ search, setSearch, searchValue, setSearchValue, navigation }) => {

    const [topList, setTopList] = useState([]);
    const [searchedList, setSearchedList] = useState([]);

    const [order, setOrder] = useState("star");
    const [label, setLabel] = useState("별점순");

    useEffect(() => {
        // example
        const infoList = [{ id: 7, cafe_name: "하이엔드라이", addr: "서울 성동구 광나루로 302", star: 4.97, review: 87 },
        { id: 2, cafe_name: "에브리데이몬데이 카페", addr: "서울 송파구 송파대로48길 14 지하 1층", star: 4.87, review: 97 },
        { id: 8, cafe_name: "까치화방 성수낙낙점", addr: "서울 성동구 아차산로17길 1층 R114호, 115호", star: 4.77, review: 67 },
        { id: 4, cafe_name: "하프커피 성수점", addr: "서울특별시 성동구 서울숲4길 12 1층", star: 4.67, review: 68 },
        ];
        // Top 4 가져오는 로직
        setTopList(infoList);
    }, []);

    const onChangeText = (value) => {
        setSearchValue(value);
    };

    const onSearch = () => {
        if (!searchValue) {
            if (Platform.OS === 'android') {
                ToastAndroid.show('검색어를 입력해주세요', ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
            else {
                AlertIOS.alert('검색어를 입력해주세요');
            }
        } else {
            setSearch(true);
            // 검색 로직
            // order by (order)

            // example
            const list = [{ id: 8, cafe_name: "까치화방 성수낙낙점", addr: "서울 성동구 아차산로17길 1층 R114호, 115호", star: 4.77, review: 67 },
            { id: 4, cafe_name: "하프커피 성수점", addr: "서울특별시 성동구 서울숲4길 12 1층", star: 4.67, review: 68 },
            ];
            setSearchedList(list);
        }
    };

    const onChangeOrder = (option) => {
        setOrder(option.key);
        setLabel(option.label);
        onSearch();
    };

    const selectorData = [
        { key: 'star', label: '별점순' },
        { key: 'review', label: '리뷰순' },
        { key: 'name', label: '이름순' },
    ];
    return (
        <>
            <Header search={search}>
                <Search placeholder='검색' value={searchValue} onChangeText={onChangeText} onIconPress={onSearch} />
                {search ?
                    <SelectBox>
                        <ModalSelector
                            data={selectorData}
                            initValue={label}
                            initValueTextStyle={{ color: "black" }}
                            selectStyle={{ borderColor: "black" }}
                            selectTextStyle={{ color: "black" }}
                            onChange={(option) => onChangeOrder(option)} >
                        </ModalSelector>
                    </SelectBox>
                    : <Title>카페어때</Title>}
            </Header>
            {search ?
                <Content>
                    {/* 검색 목록 */}
                    <InfoList infos={searchedList} navigation={navigation} />
                </Content>
                :
                <Content>
                    {/* top4-list */}
                    <InfoList infos={topList} navigation={navigation} />
                </Content>
            }
        </>
    );
};

const Header = styled.View`
    align-items: center;
    padding-top: 40px;
    background-color: ${(props) => (props.search ? "#FFFFFF" : "#FF8E26")}; 
`;

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

const SelectBox = styled.View`
    width: 100%;
    padding-left: 20px;
    padding-top: 10px;
    flex-direction: row-reverse;
`;

const Content = styled.ScrollView`
    flex-grow: 1;
    width: 100%;
    padding-top: 20px;
    padding: 20px;
    background-color: #ffffff;
`;

export default HomeScreen;