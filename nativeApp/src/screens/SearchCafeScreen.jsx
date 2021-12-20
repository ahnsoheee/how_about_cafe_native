import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components/native';
import { Searchbar } from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';
import Icon from "react-native-vector-icons/Feather";
import { Text } from "react-native";
import InfoList from "../components/common/InfoList";
import { API } from '../api/api';

const SearchCafeScreen = ({ navigation, route }) => {
    const user_id = route.params.user_id;
    const [searchValue, setSearchValue] = useState('');
    const [searchedCafe, setSearchedCafe] = useState([]);

    const [order, setOrder] = useState("star");
    const [label, setLabel] = useState("별점순");
    const [search, setSearch] = useState(false);
    const [nothing, setNothing] = useState(false);

    const onChangeText = (value) => {
        setSearchValue(value);
    };

    useEffect(() => {
        onSearch();
    }, [order]);

    const onSearch = useCallback(async () => {
        if (searchValue) {
            const res = await API.get(`/cafe?query=${searchValue}&order=${order}`);
            setSearchedCafe(res);
            if (res.length != 0) {
                setSearch(true);
                setNothing(false);
            } else {
                setSearch(false);
                setNothing(true);
            }
        }
    });

    const onChangeOrder = (option) => {
        setOrder(option.key);
        setLabel(option.label);
    };

    const selectorData = [
        { key: 'star', label: '별점순' },
        { key: 'review', label: '리뷰순' },
        { key: 'cafe_name', label: '이름순' },
    ];

    const goBack = () => {
        setOrder('star');
        setLabel('별점순');
        setSearch(false);
        navigation.goBack();
    };

    return (
        <>
            <Header>
                <Icon name="arrow-left" size={25} onPress={goBack} />
                <Search placeholder="검색어를 입력해주세요" value={searchValue} onChangeText={onChangeText} onSubmitEditing={onSearch} />
            </Header>
            {search ? (
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
            ) : <></>}

            <Content>
                {nothing ?
                    <Nothing>
                        <Text>검색결과가 없습니다.</Text>
                    </Nothing> :
                    <InfoList user_id={user_id} infos={searchedCafe} navigation={navigation} />

                }
            </Content>
        </>
    );
};


const Header = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 0 10px;
    padding-top: 50px;
    background-color: #FFFFFF;
`;

const Search = styled(Searchbar)`
    width: 90%;
    margin: 10px;
`;

const SelectBox = styled.View`
    width: 100%;
    padding-left: 20px;
    padding-top: 10px;
    flex-direction: row-reverse;
    background-color: #ffffff;
`;

const Content = styled.ScrollView`
    flex-grow: 1;
    width: 100%;
    padding-top: 20px;
    padding: 20px;
    background-color: #ffffff;
`;

const Nothing = styled.View`
    align-items: center;
`;

export default SearchCafeScreen;