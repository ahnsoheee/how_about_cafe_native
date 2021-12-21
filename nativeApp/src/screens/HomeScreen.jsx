import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import Icon from "react-native-vector-icons/Feather";
import InfoList from '../components/common/InfoList';
import { useFocusEffect } from "@react-navigation/native";
import { API } from "../api/api";

const HomeScreen = ({ user_id, navigation }) => {
    const [top4Cafe, setTop4Cafe] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const getTop4Cafe = async () => {
                const result = await API.get("/cafe/top4");
                if (result) setTop4Cafe(result);
            };
            getTop4Cafe();
        }, [])

    );

    return (
        <>
            <Header>
                <Search onPress={() => navigation.navigate('SearchCafe', { user_id: user_id })}>
                    <Icon name="search" size={20} />
                    <Text>검색하기</Text>
                </Search>
                <Title>카페어때</Title>
            </Header>
            <Content>
                <InfoList user_id={user_id} infos={top4Cafe} navigation={navigation} />
            </Content>
        </>
    );
};

const Header = styled.View`
    align-items: center;
    padding-top: 50px;
    background-color: #FF8E26;
`;

const Search = styled.TouchableOpacity`
    flex-direction: row;
    width: 90%;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #FFFFFF;
`;

const Text = styled.Text`
    font-size: 20px;
    padding-left: 10px;
    color: #888888;
`;

const Title = styled.Text`
    width: 87%;
    font-weight: bold;
    font-size: 24px;
    color: #ffffff;
    padding-top: 10px;
    padding-bottom: 20px;
`;

const Content = styled.ScrollView`
    flex-grow: 1;
    width: 100%;
    padding-top: 20px;
    padding: 20px;
    background-color: #ffffff;
`;

export default HomeScreen;